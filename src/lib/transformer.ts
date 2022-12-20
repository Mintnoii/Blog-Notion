import * as R from 'remeda'
import { IArticle } from '@/types/data'
import { IPageObject,IRichTextItem,IBlockObject, IBlockObjectResp } from '@/types/notion'
import { ChildPageBlockObjectResponse,TextRichTextItemResponse,ToDoBlockObjectResponse, CalloutBlockObjectResponse, ImageBlockObjectResponse, CodeBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'

const getTextContent = (RichTextItems:IRichTextItem[]) => {
  const theItem = RichTextItems[0] as TextRichTextItemResponse
  return theItem?.text?.content || ''
}

export function formatHashLink(link_text: string) {
  return link_text.toLowerCase().replace(/ /g, '-')
}

export const formatDate = (timestamp: string): string => {
  const date = new Date(timestamp)
  const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`
  return formattedDate
}

export const formatPageInfo = (page:IPageObject):IArticle => {
  const cover_image =  R.pathOr(page, ['cover','external','url'],'') as string
  const tags = R.pathOr(page, ['properties','Tags','multi_select'],[]) as any[]
  return {
    id: page.id,
    name: getTextContent(R.pathOr(page, ['properties','Page','title'],[]) as IRichTextItem[]),
    cover_image,
    last_edited_time: formatDate(page.last_edited_time),
    tags
  }
}
const calcRichText = (block:any) => {
  const rich_text_items =  R.pathOr(block, [block.type,'rich_text'],[]) as TextRichTextItemResponse[]
  const rich_text = rich_text_items.map(item => {
    return {
      type: item.type,
      content: item.text?.content || '',
      link: item.text?.link?.url || '',
      annotations: item.annotations
    }
  })
  return {rich_text}
}
// https://developers.notion.com/reference/block
export const formatContent = (block:IBlockObjectResp) => {
  const {id,type,has_children,children} = block
  const basicData = {id, type,has_children, children}
  switch (type) {
    case 'heading_1':
    case 'heading_2':
    case 'heading_3':
    case 'bulleted_list_item':
    case 'numbered_list_item':
    case 'paragraph':
    case 'quote':
    case 'toggle':
      return {
        ...basicData,
        ...calcRichText(block)
      } as IBlockObject
    case 'to_do':
      return {
        ...basicData,
        ...calcRichText(block),
        checked: (block as ToDoBlockObjectResponse).to_do.checked
      } as IBlockObject
    case 'callout':
      return {
        ...basicData,
        ...calcRichText(block),
        icon: (block as CalloutBlockObjectResponse).callout.icon
      } as IBlockObject
    case 'child_page':
      return {
        ...basicData,
        title: (block as ChildPageBlockObjectResponse).child_page.title
      } as IBlockObject
    case 'image':
      return {
        ...basicData,
        image: (block as ImageBlockObjectResponse).image,
        caption: (block as ImageBlockObjectResponse).image.caption
      } as IBlockObject
    case 'code':
      return {
        ...basicData,
        ...calcRichText(block),
        language: (block as CodeBlockObjectResponse).code.language
      } as IBlockObject
    default:
      return block as IBlockObject
  }
  // return block
}
