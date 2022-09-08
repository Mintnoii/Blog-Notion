// import { Client } from '@notionhq/client'
// import { NotionCompatAPI } from 'notion-compat'
import { NotionAPI } from 'notion-client'
import { ExtendedRecordMap, SearchParams, SearchResults } from 'notion-types'


// TODO 是否使用官方 API
// const notion = useOfficialNotionAPI
//   ? new NotionCompatAPI(new Client({ auth: process.env.NOTION_TOKEN }))
//   : new NotionAPI()

const notion = new NotionAPI({userTimeZone: 'Asia/ShangHai'})

export async function getPage(pageId: string): Promise<ExtendedRecordMap> {
  const recordMap = await notion.getPage(pageId)
  return recordMap
}

export async function search(params: SearchParams): Promise<SearchResults> {
  return notion.search(params)
}