import { Client } from '@notionhq/client'
import * as R from 'remeda'
import {getFormatDate} from '@/utils'
import { IArticle } from '@/lib/types'
import { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'
const notion = new Client({ auth: process.env.NOTION_TOKEN })

export const getDatabase = (database_id:string) => notion.databases.query({ database_id })

export const getPage = (page_id:string) => notion.pages.retrieve({ page_id })

export const getBlocks = async (block_id:string, start_cursor?:string|null) => {
  const response = await notion.blocks.children.list({
    block_id,
    start_cursor: start_cursor || undefined,
    page_size: 50,
  })
  return response
}

 export const getAllBlockContent = async (page_id:string, start_cursor?:string|null) => {
  const blocks = await getBlocks(page_id,start_cursor)
  const content = [...blocks.results]
  if (blocks.has_more) {
    const nextBlocks = await getAllBlockContent(page_id, blocks.next_cursor)
    content.push(...nextBlocks)
  }
  return content
}


 export const fetchPage = async (page_id:string) => {
  const page = await getPage(page_id)
  const content = await getAllBlockContent(page_id)

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

// export const transformPageToQuestion = (page: BlockObjectResponse ): any => {
//   const data:any = {
//     id: page.id,
//     title: '',
//     content: '',
//     // Initialize other properties as needed
//   };

//   for (const key in page.properties) {
//     const property = page.properties[key];
//     switch (property.type) {
//       case 'relation':
//         data[key] = property.relation[0].id;
//         break;

//       case 'title':
//       case 'rich_text':
//         if (property[property.type].length > 0) {
//           data[key] = property[property.type][0].text.content;
//         }
//         break;

//       default:
//         data[key] = property;
//         break;
//     }
//   }

//   return data;
// };