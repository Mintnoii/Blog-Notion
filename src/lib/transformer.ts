import * as R from 'remeda'
import { IArticle } from '@/types/data'
import { IPageObject,IRichTextItem,IBlockObject,IHeading, IHeadingBlock } from '@/types/notion'
import { PageObjectResponse,TextRichTextItemResponse,BlockObjectResponse,Heading1BlockObjectResponse,Heading2BlockObjectResponse,Heading3BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'

const getTextContent = (RichTextItems:IRichTextItem[]) => {
  const theItem = RichTextItems[0] as TextRichTextItemResponse
  return theItem?.text?.content || ''
}

export const formatDate = (timestamp: string): string => {
  const date = new Date(timestamp);
  const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
  return formattedDate;
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
// https://developers.notion.com/reference/block
export const formatContent = (block:IBlockObject) => {
  const {id,type} = block
  const basicData = {id, type}

  switch (type) {
    case 'heading_1':
    case 'heading_2':
    case 'heading_3':
    case 'paragraph':
      // return {
      //   ...basicData,
      //   text: getTextContent(R.pathOr(block, [block.type,'rich_text'],[]) as IRichTextItem[])
      // }
    case 'bulleted_list_item':
    case 'numbered_list_item':
      return {
        ...basicData,
        text: getTextContent(R.pathOr(block, [block.type,'rich_text'],[]) as IRichTextItem[])
      }
    default:
      return basicData
  }
}
