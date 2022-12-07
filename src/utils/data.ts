import * as R from 'remeda'
import { IArticle } from '@/types/data'
import { IPageObject,IRichTextItem,IBlockObject,IHeadingBlockObject } from '@/types/notion'
import { PageObjectResponse,RichTextItemResponse,BlockObjectResponse,Heading1BlockObjectResponse,Heading2BlockObjectResponse,Heading3BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'

export const formatDate = (timestamp: string): string => {
  const date = new Date(timestamp);
  const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
  return formattedDate;
}


export const formatPageInfo = (page:IPageObject):IArticle => {
  const pageTitles = R.pathOr(page, ['properties','Page','title'],[]) as IRichTextItem[]
  const cover_image =  R.pathOr(page, ['cover','external','url'],'') as string
  const tags = R.pathOr(page, ['properties','Tags','multi_select'],[]) as any[]
  return {
    id: page.id,
    name: pageTitles[0].plain_text,
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
    // case 'heading_2':
    // case 'heading_3':
      const  headingBlock = block as IHeadingBlockObject
      return {
        ...basicData,
        // text:headingBlock[block.type].rich_text?.[0].plain_text
      }
    case 'paragraph':
      return block[type].rich_text
    default:
      return ''
  }
}

