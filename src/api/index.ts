import {queryDatabase} from '@/lib/notion'
import * as R from 'remeda'
import {getFormatDate} from '@/utils'
import { IArticle } from '@/types/data'

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
  console.log(dbRes,'dbRes')
  return dbRes.results.map((page) => {
    const thePage = page as any
    const pageTitles = R.pathOr(thePage, ['properties','Page','title'],[])
    return {
      id: thePage.id,
      name:pageTitles[0].plain_text,
      cover_image: R.pathOr(thePage, ['cover','external','url'],''),
      last_edited_time: getFormatDate(thePage.last_edited_time),
      tags: R.pathOr(thePage, ['properties','Tags','multi_select'],[]),
    }
  })
}
