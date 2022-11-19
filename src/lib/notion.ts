import { Client } from '@notionhq/client'
import * as R from 'remeda'
import {getFormatDate} from '@/utils'
import { IArticle } from '@/lib/types'
import { PageObjectResponse, PartialDatabaseObjectResponse } from '@notionhq/client/build/src/api-endpoints'
// import { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints'
// console.log(process.env.NOTION_TOKEN,'====', process.env.NOTION_DATABASE_ID)
const notion = new Client({ auth: process.env.NOTION_TOKEN })

export const getDatabase = async (databaseId:string) => {
  const response = await notion.databases.query({
    // database_id: process.env.NOTION_DATABASE_ID || '',
    database_id: databaseId,
  })
  console.log(response,'response')
  return response.results
}

export const getPage = async (pageId:string) => {
  const response = await notion.pages.retrieve({ page_id: pageId })
  return response
}

export const getBlocks = async (blockId:string) => {
  const response = await notion.blocks.children.list({
    block_id: blockId,
    page_size: 50,
  })
  return response.results
}


export const getBlogs = async (databaseId:string):Promise<IArticle[]> => {
  const response = await notion.databases.query({
    // database_id: process.env.NOTION_DATABASE_ID || '',
    database_id: databaseId,
    filter: {
      property: 'Status',
      status: {
        equals: 'Blog',
      }
    }
  })
  console.log(response,'response')
  return response.results.map((page) => {
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


export const getWorkSpace = async () => {
  const response = await notion.search({
    query: '',
    filter: {
      value: 'database',
      property: 'object',
    },
    sort: {
      direction: 'descending',
      timestamp: 'last_edited_time'
    },
  })
  console.log(response,'response')
  return response.results
}

// export const getPublishedArticles = async (databaseId) => {
//   const response = await notion.databases.query({
//     database_id: databaseId,
//     filter: {
//       property: 'Status',
//       select: {
//         equals: '✅ Published',
//       },
//     },
//     sorts: [
//       {
//         property: 'Published',
//         direction: 'descending',
//       },
//     ],
//   })

//   return response.results
// }