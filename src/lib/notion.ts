import { Client } from '@notionhq/client'
import * as R from 'remeda'
import { PageObjectResponse, PartialDatabaseObjectResponse } from '@notionhq/client/build/src/api-endpoints'
// import { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints'
// console.log(process.env.NOTION_TOKEN,'====', process.env.NOTION_DATABASE_ID)
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})

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


export const getPosts = async (databaseId:string) => {
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
    console.log(thePage,'page');
    const titleObj = R.pickBy(thePage.properties, (val, key) => key === 'Page' && val.type === 'title')
    const titleProp = R.pathOr(thePage, ['properties','Page','title'],{})
    return {
      title:titleProp
    }
  })
}