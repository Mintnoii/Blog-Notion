import {formatPageInfo} from '@/utils'
import {queryDatabase, retrievePage, getAllBlockContent} from '@/lib/notion'
import { IArticle } from '@/types/data'
import { IPageObject } from '@/types/notion'

export const getPage = async (page_id:string) => {
  const page = await retrievePage(page_id)
  const pageInfo = formatPageInfo(page as IPageObject)
  const content = await getAllBlockContent(page_id)
  return {
    ...pageInfo,
    content
  }
}
export const getBlogs = async (database_id:string):Promise<IArticle[]> => {
  const dbRes = await queryDatabase({
    database_id,
    filter: {
      property: 'Status',
      status: {
        equals: 'Blog',
      }
    }
  })
  return dbRes.results.map((page) => formatPageInfo(page as IPageObject))
}

