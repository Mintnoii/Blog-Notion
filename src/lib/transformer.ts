import * as R from 'remeda'
import { IArticle } from '@/types/data'
import { IPageObject,IRichTextItem,IBlockObject,IHeading, IHeadingBlock, IListBlock, IList } from '@/types/notion'
import { PageObjectResponse,TextRichTextItemResponse,RichTextItemResponse, BlockObjectResponse, } from '@notionhq/client/build/src/api-endpoints'

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

const getRichText = (RichTextItems:TextRichTextItemResponse[]) => {
  const richTextArr = RichTextItems.map(item => {
    // console.log(item,'item')
    return {
      type: item.type,
      content: item.text?.content || '',
      link: item.text?.link?.url || '',
      annotations: item.annotations
    }
  })
  return richTextArr
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
// todo 支持 toggle 子项
const calcHeading = (block:IHeadingBlock) => {
  const {id,type} = block
  const rich_text_items = R.pathOr(block, [block.type,'rich_text'],[]) as TextRichTextItemResponse[]
  return {
    id,
    type,
    rich_text: getRichText(rich_text_items),
  }
}
// todo 支持 list 子项
const calcListItems = (block:IListBlock) => {
  const {id,type} = block
  console.log(block,'listttttt');
  const rich_text_items = R.pathOr(block, [type,'rich_text'],[]) as TextRichTextItemResponse[]
  return {
    id,
    parent_id: R.pathOr(block, [type,'rich_text'],[]),
    type,
    rich_text: getRichText(rich_text_items),
  }
}
// https://developers.notion.com/reference/block
export const formatContent = (block:IBlockObject) => {
  const {id,type,has_children} = block
    const test = block as any

  const basicData = {id, type,has_children, children: test.children}
  switch (type) {
    case 'heading_1':
    case 'heading_2':
    case 'heading_3':
      return calcHeading(block as IHeadingBlock)
    case 'bulleted_list_item':
    case 'numbered_list_item':
      return {
        ...basicData,
        ...calcListItems(block as IListBlock)
      }
    case 'paragraph':
      return {
        ...basicData,
        rich_text: getRichText(R.pathOr(block, [block.type,'rich_text'],[]) as TextRichTextItemResponse[])
      }
    default:
      return basicData
  }
  // return block
}
