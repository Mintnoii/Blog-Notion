import { ExtendedRecordMap } from 'notion-types'
import {
  parsePageId,
  getCanonicalPageId as getCanonicalPageIdImpl
} from 'notion-utils'

// 获取规范化的页面ID
export function getCanonicalPageId(
  pageId: string,
  recordMap: ExtendedRecordMap,
  { uuid = true }: { uuid?: boolean } = {}
): string | null {
  const cleanPageId = parsePageId(pageId, { uuid: false })
  if (!cleanPageId) {
    return null
  }

  return getCanonicalPageIdImpl(pageId, recordMap, {
    uuid
  })
}

// 一些状态的验证
// import * as acl from './acl'
import { site } from './config'
// 后面可以考虑使用本地数据库进行缓存
// import { db } from './db'
import { getPage } from './notion'

export async function resolveNotionPage(domain: string, rawPageId?: string) {
  let pageId: string
  let recordMap: ExtendedRecordMap

	console.log('解析页面内容')
  if (rawPageId && rawPageId !== 'index') {
    pageId = parsePageId(rawPageId)
    if (pageId) {
      recordMap = await getPage(pageId)
    }  else {
      //  GG 🤔
			console.log('id 不匹配跳转 404 ')
      return {
        error: {
          message: `Not found "${rawPageId}"`,
          statusCode: 404
        }
      }
    }
  } else {
    // 网站首页
    pageId = site.rootNotionPageId

    console.log(site)
    recordMap = await getPage(pageId)
  }

  const props = { site, recordMap, pageId }
  // return { ...props, ...(await acl.pageAcl(props)) }
  return { ...props }
}
