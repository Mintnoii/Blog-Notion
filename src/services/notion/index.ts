import { queryDatabase, retrievePage, listBlocks } from '@/services/notion/api'
import { IDataItem } from '@/services/notion/types'

export const getDataItems = async (database_id: string): Promise<IDataItem[]> => {
  const dbRes = await queryDatabase({
    database_id,
    filter: {
      property: 'Status',
      status: {
        equals: 'Done',
      }
    }
  })
  return dbRes.results as any
  // return dbRes.results.map((item) => formatPageInfo(page as IDataItem))
}