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
  const rich_text_items = R.pathOr(block, [block.type,'rich_text'],[]) as TextRichTextItemResponse[]
  return {
    rich_text: getRichText(rich_text_items),
  }
}
// todo 支持 list 子项
const calcListItems = (block:IListBlock) => {
  const rich_text_items = R.pathOr(block, [block.type,'rich_text'],[]) as TextRichTextItemResponse[]
  return {
    rich_text: getRichText(rich_text_items),
  }
}
// https://developers.notion.com/reference/block
export const formatContent = (block:IBlockObject) => {
  const {id,type,has_children,children} = block
  const basicData = {id, type,has_children, children}
  console.log(block,'block===', type);
  if(!type){
    const test = block as any
    return {
      type: 'paragraph',
      rich_text: getRichText(test.rich_text as TextRichTextItemResponse[])
    }
  }
  switch (type) {
    case 'heading_3':
      console.log(block, 'heading_33333')
      return block
    case 'heading_1':
    case 'heading_2':
    // case 'heading_3':
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
        rich_text: getRichText(block.paragraph.rich_text as TextRichTextItemResponse[])
      }
    case 'to_do':
      return {
        ...basicData,
        rich_text: getRichText(block.to_do.rich_text as TextRichTextItemResponse[]),
        checked: block.to_do.checked
      }
    case 'toggle':
      return {
        ...basicData,
        rich_text: getRichText(block.toggle.rich_text as TextRichTextItemResponse[]),
      }
    case 'child_page':
      return {
        ...basicData,
        title: block.child_page.title
      }
    default:
      return block
  }
  // return block
}
