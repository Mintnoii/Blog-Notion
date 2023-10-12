import { Client } from '@notionhq/client'
import { QueryDatabaseParameters, BlockObjectResponse, GetPageResponse } from '@notionhq/client/build/src/api-endpoints'
const notion = new Client({ auth: process.env.NOTION_TOKEN })

export const queryDatabase = (params: QueryDatabaseParameters) => notion.databases.query(params)

export const retrievePage = (page_id: string) => notion.pages.retrieve({ page_id })

export const listBlocks = async (block_id: string, start_cursor?: string | null) => {
  const response = await notion.blocks.children.list({
    block_id,
    start_cursor: start_cursor || undefined,
    page_size: 50,
  })
  return response
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
  return response.results
}
