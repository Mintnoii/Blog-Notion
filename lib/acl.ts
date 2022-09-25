import { PageProps } from 'types'

export async function pageAcl({
  site,
  recordMap,
  pageId
}: PageProps): Promise<PageProps> {
  if (!site) {
    return {
      error: {
        statusCode: 404,
        message: '无法解析 Notion 页面'
      }
    }
  }

  if (!recordMap) {
    return {
      error: {
        statusCode: 404,
        message: `无法解析 "${site.domain}"下的 Notion 页面（${pageId}）`
      }
    }
  }

  const keys = Object.keys(recordMap.block)
  const rootKey = keys[0]

  if (!rootKey) {
    return {
      error: {
        statusCode: 404,
        message: `无法解析 "${site.domain}"下的 Notion 页面数据（${pageId}）`
      }
    }
  }

  const rootValue = recordMap.block[rootKey]?.value
  const rootSpaceId = rootValue?.space_id

  // if (
  //   rootSpaceId &&
  //   site.rootNotionSpaceId &&
  //   rootSpaceId !== site.rootNotionSpaceId
  // ) {
  //   if (process.env.NODE_ENV) {
  //     return {
  //       error: {
  //         statusCode: 404,
  //         message: `Notion page "${pageId}" doesn't belong to the Notion workspace owned by "${site.domain}".`
  //       }
  //     }
  //   }
  // }
}
