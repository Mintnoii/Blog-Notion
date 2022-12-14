import {formatPageInfo, formatContent} from '@/lib/transformer'
import {queryDatabase, retrievePage, listBlocks} from '@/lib/notion'
import { IArticle } from '@/types/data'
import { IPageObject,IRichTextItem,IBlockObject, IHeadingBlock, IListBlock, IList } from '@/types/notion'

export const getPage = async (page_id:string) => {
  const page = await retrievePage(page_id)
  const pageInfo = formatPageInfo(page as IPageObject)
  const content = await getAllBlocks(page_id)
  const contentInfo = content.map((block) => formatContent(block))
  return {
    ...pageInfo,
    contentInfo
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

// 获取指定页面 (page_id) 下的所有块，并将这些块内容以数组形式返回
// 这里的块都为第一层的内容，不包含子块
export const getAllBlocks = async (page_id:string, start_cursor?:string|null) => {
  const blocks = await listBlocks(page_id,start_cursor)
  const {results, has_more,next_cursor} = blocks
  if (has_more) {
    const nextBlocks = await getAllBlocks(page_id, next_cursor)
    results.push(...nextBlocks)
  }
  return results as IBlockObject[]
}

export const getPageContent = async (pageId: string) => {
  const blocks = await getAllBlocks(pageId);
  // 处理块内容，将块内容转换为前端需要的格式
  const allPromise = blocks.map(async (block) => {
      const { id,type,has_children } = block;
      if (has_children && !['unsupported', 'child_page'].includes(type)) {
        block.children = await getPageContent(id)
      }else{
        block.children = []
      }
      return formatContent(block)
    })
  return await Promise.all(allPromise) as IBlockObject[]
};
    // return Promise.all(
    //   blocksChildren.map(async (block) => {
    //     // return BlockTypeTransformLookup[block.type as BlockType](block);
    //     return formatContent(block)
    //   }),
    // )
    // .then((blocks) => {
    //   return blocks.reduce((acc: any, curr) => {
    //     if (curr.type === 'bulleted_list_item') {
    //       if (acc[acc.length - 1]?.type === 'bulleted_list') {
    //         acc[acc.length - 1][acc[acc.length - 1].type].children?.push(curr);
    //       } else {
    //         acc.push({
    //           type: 'bulleted_list',
    //           bulleted_list: { children: [curr] },
    //         });
    //       }
    //     } else if (curr.type === 'numbered_list_item') {
    //       if (acc[acc.length - 1]?.type === 'numbered_list') {
    //         acc[acc.length - 1][acc[acc.length - 1].type].children?.push(curr);
    //       } else {
    //         acc.push({
    //           type: 'numbered_list',
    //           numbered_list: { children: [curr] },
    //         });
    //       }
    //     } else {
    //       acc.push(curr);
    //     }
    //     return acc;
    //   }, []);
    // });