import { queryDatabase, retrievePage, listBlocks } from '@/services/notion/api'
import { IDataItem, IPageObject, } from '@/services/notion/types'
import { formatProject } from './format'

/**
 * 获取开源项目数据
 */
export const getProjects = async (): Promise<IDataItem[]> => {
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
  return dbRes.results.map((item) => formatProject(item as IPageObject))
}