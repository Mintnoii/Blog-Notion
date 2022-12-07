import { Client } from '@notionhq/client'
import { QueryDatabaseParameters,BlockObjectResponse,GetPageResponse } from '@notionhq/client/build/src/api-endpoints'
const notion = new Client({ auth: process.env.NOTION_TOKEN })

export const queryDatabase = (params:QueryDatabaseParameters) => notion.databases.query(params)

export const retrievePage = (page_id:string) => notion.pages.retrieve({ page_id })

export const listBlocks = async (block_id:string, start_cursor?:string|null) => {
  const response = await notion.blocks.children.list({
    block_id,
    start_cursor: start_cursor || undefined,
    page_size: 50,
  })
  return response
}

 export const getAllBlockContent = async (page_id:string, start_cursor?:string|null) => {
  const blocks = await listBlocks(page_id,start_cursor)
  const content = [...blocks.results]
  if (blocks.has_more) {
    const nextBlocks = await getAllBlockContent(page_id, blocks.next_cursor)
    content.push(...nextBlocks)
  }
  return content as BlockObjectResponse[]
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