import { Client } from '@notionhq/client'
// import { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints'
console.log(process.env.NOTION_TOKEN,'====', process.env.NOTION_DATABASE_ID)
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})

export const getDatabase = async (databaseId:string) => {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID || '',
  })
  console.log(response,'response')
  return response.results
}

export const getPage = async (pageId:string) => {
  const response = await notion.pages.retrieve({ page_id: pageId })
  return response
}