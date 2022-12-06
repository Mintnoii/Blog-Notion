import * as R from 'remeda'
import { IArticle } from '@/types/data'
import { IPageObjectResponse,IRichTextItemResponse } from '@/types/notion'

export const getFormatDate = (timestamp: string): string => {
  const date = new Date(timestamp);
  const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
  return formattedDate;
}


export const getPageInfo = (page:IPageObjectResponse):IArticle => {
  const pageTitles = R.pathOr(page, ['properties','Page','title'],[]) as IRichTextItemResponse[]
  const cover_image =  R.pathOr(page, ['cover','external','url'],'') as string
  const tags = R.pathOr(page, ['properties','Tags','multi_select'],[]) as any[]
  return {
    id: page.id,
    name: pageTitles[0].plain_text,
    cover_image,
    last_edited_time: getFormatDate(page.last_edited_time),
    tags
  }
}