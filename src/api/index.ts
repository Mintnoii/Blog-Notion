import {formatPageInfo, formatContent} from '@/lib/transformer'
import {queryDatabase, retrievePage, listBlocks} from '@/lib/notion'
import { IArticle } from '@/types/data'
import { IPageObject,IBlock,IBlockObject, IBlockObjectResp, IList } from '@/types/notion'

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
  const data = results as IBlockObjectResp[]
  if (has_more) {
    const more_blocks = await getAllBlocks(page_id, next_cursor)
    data.push(...more_blocks)
  }
  return data as IBlockObjectResp[]
}

export const getPageContent = async (pageId: string) => {
  const blocks = await getAllBlocks(pageId);
  // 处理块内容，将块内容转换为前端需要的格式
  const allPromise = blocks.map(async (block) => {
    const { id,type,has_children } = block
    if (has_children && !['unsupported', 'child_page'].includes(type)) {
      block.children = await getPageContent(id) as IBlockObjectResp[]
    }else{
      block.children = []
    }
    return formatContent(block)
  })
  const content = await Promise.all(allPromise)
  return content
}

export const calcListItems = (blocks: IBlock[]): IBlock[] => {
  return blocks.reduce((acc: IBlock[], block: IBlock) => {
    const lastBlock = acc[acc.length - 1]
    // 如果该列表项有子项 递归处理子项
      if (block.has_children && block.children) {
        // 如果该列表项有子项 递归处理子项
        Object.assign(block, {children: calcListItems(block.children)})
      }
    if (block.type === 'bulleted_list_item' && lastBlock?.type === 'bulleted_list') {
      // 如果当前块是 bulleted_list_item，且上一个块是 bulleted_list，则加入到上一个 bulleted_list 的 children 中
      lastBlock.children.push(block);
    } else if (block.type === 'numbered_list_item' && lastBlock?.type === 'numbered_list') {
      // 如果当前块是 numbered_list_item，且上一个块是 numbered_list，则加入到上一个 numbered_list 的 children 中
      lastBlock.children.push(block);
    } else {
      // 否则，根据当前块的类型创建新的列表对象并加入到结果数组中
      if (block.type === 'bulleted_list_item') {
        acc.push({
          type: 'bulleted_list',
          has_children: true,
          children: [block],
        });
      } else if (block.type === 'numbered_list_item') {
        acc.push({
          type: 'numbered_list',
          has_children: true,
          children: [block],
        });
      } else {
        acc.push(block);
      }
    }


    return acc;
  }, [])
}

export const getPage = async (page_id:string) => {
  const page = await retrievePage(page_id)
  const pageInfo = formatPageInfo(page as IPageObject)
  const pageContent = await getPageContent(page_id)
  const content = calcListItems(pageContent)
  return {
    ...pageInfo,
    content
  }
}