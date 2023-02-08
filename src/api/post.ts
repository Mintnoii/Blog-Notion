import {NotionKit,IPageObject} from "@tachikomas/notion-kit"
import { IBlock, IPost, IProject, ITag, IBlockObjectResp } from '@/services/notion/types'
import { formatProject, formatPageInfo, formatContent } from './format'
const {notion, queryDatabase, retrievePage, retrieveBlockChildren }  = new NotionKit({ token: process.env.NOTION_TOKEN })
export { notion, queryDatabase, retrieveBlockChildren, retrievePage }


/**
 * 获取所有已发布的博客文章
 * @returns {Promise<IPost[]>} 返回一个包含所有已发布博客文章的Promise
 */
export const getPublishedPosts = async () => {
  // 从环境变量中获取已发布博客的 ID 列表
  const postIds: string[] = JSON.parse(process.env.NOTION_BLOGS_IDS || '[]');
  // 构建 Promise 数组，每个 Promise 代表获取一个博客的异步操作
  const promiseArr = postIds.map((id: string) => getBlogs(id));
  // 使用 Promise.allSettled 等待所有异步操作完成
  const results = await Promise.allSettled(promiseArr);
  // 从 Promise 结果中提取已成功获取的博客数据，合并成一个数组，并按最后编辑时间降序排序
  const posts = results.map((result: PromiseSettledResult<IPost[]>) => result.status === 'fulfilled' ? result.value : []).flat().sort((a, b) => {
    const dateA = new Date(a.last_edited_time).getTime()
    const dateB = new Date(b.last_edited_time).getTime()
    return dateB - dateA
  })
  return posts
}


export const collectAllTags = (posts: IPost[]) => {
  return posts.reduce((allTags, item) => {
    item.tags?.forEach(tag => {
      const isTagAlreadyAdded = allTags.some(existingTag => existingTag.name === tag.name);
      if (!isTagAlreadyAdded) {
        allTags.push(tag)
      }
    })
    return allTags
  }, [] as ITag[])
}

async function getBlogs(database_id: string): Promise<IPost[]> {
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

/**
 * 获取开源项目数据
 */
export const getProjects = async (): Promise<IProject[]> => {
  const dbRes = await queryDatabase({
    database_id: process.env.NOTION_PROJECTS_PAGE_ID || '',
    filter: {
      'or': [
        {
          property: 'Status',
          status: {
            equals: 'In progress',
          }
        },
        {
          property: 'Status',
          status: {
            equals: 'Done',
          }
        }
      ]
    }
  })
  // return dbRes.results as IPageObject[]
  return dbRes.results.map((item) => formatProject(item as IPageObject))
}


// 获取指定页面 (page_id) 下的所有块，并将这些块内容以数组形式返回
// 这里的块都为第一层的内容，不包含子块
export const getAllBlocks = async (page_id: string, start_cursor?: string) => {
  const blocks = await retrieveBlockChildren(page_id, { start_cursor })
  const { results, has_more, next_cursor } = blocks
  const data = results as IBlockObjectResp[]
  if (has_more) {
    const more_blocks = await getAllBlocks(page_id, next_cursor || undefined)
    data.push(...more_blocks)
  }
  return data as IBlockObjectResp[]
}

export const getPageContent = async (pageId: string) => {
  const blocks = await getAllBlocks(pageId);
  // 处理块内容，将块内容转换为前端需要的格式
  const allPromise = blocks.map(async (block) => {
    const { id, type, has_children } = block
    if (has_children && !['unsupported', 'child_page'].includes(type)) {
      block.children = await getPageContent(id) as IBlockObjectResp[]
    } else {
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
      Object.assign(block, { children: calcListItems(block.children) })
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
          // todo 待优化 这里手动生成一个 id
          id: Math.random().toString(36),
          type: 'bulleted_list',
          has_children: true,
          children: [block],
        });
      } else if (block.type === 'numbered_list_item') {
        acc.push({
          id: Math.random().toString(36),
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

export const getPage = async (page_id: string) => {
  const page = await retrievePage(page_id)
  const pageInfo = formatPageInfo(page as IPageObject)
  const pageContent = await getPageContent(page_id)
  const content = calcListItems(pageContent)
  return {
    ...pageInfo,
    content
  }
}

/**
 * 获取开源项目数据
 */
export const getThinking = async () => (getBlogs(process.env.NOTION_THINKING_PAGE_ID || ''))