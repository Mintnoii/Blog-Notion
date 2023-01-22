import { NotionKit } from '@tachikomas/notion-kit'
const notionKit = new NotionKit({ token: process.env.NOTION_TOKEN })
const { queryDatabase, retrievePage, retrieveBlockChildren: listBlocks } = notionKit
export { queryDatabase, listBlocks, retrievePage }
