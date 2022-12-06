import {getPageInfo, getFormatDate} from '@/utils'
import {queryDatabase, retrievePage, getAllBlockContent} from '@/lib/notion'
import { IArticle } from '@/types/data'
import { IPageObjectResponse } from '@/types/notion'

export const getPage =async (page_id:string) => {
  const page = await retrievePage(page_id)
}
export const getBlogs = async (blogId:string):Promise<IArticle[]> => {
  const dbRes = await queryDatabase({
    database_id: blogId,
    filter: {
      property: 'Status',
      status: {
        equals: 'Blog',
      }
    }
  })
  return dbRes.results.map((page) => getPageInfo(page as IPageObjectResponse))
}

 export const fetchPage = async (page_id:string) => {
  const page = await retrievePage(page_id)
  const content = await getAllBlockContent(page_id)

}
