import { ExtendedRecordMap, PageMap } from 'notion-types'
// Node 的 querystring 模块
import { ParsedUrlQuery } from 'querystring'
export * from 'notion-types'

export type NavigationStyle = 'default' | 'custom'

export interface Site {
  name: string
  domain: string

  rootNotionPageId: string
  // rootNotionSpaceId: string

  // settings
  // html?: string
  // fontFamily?: string
  // darkMode?: boolean
  // previewImages?: boolean

  // opengraph metadata
  description?: string
  image?: string
}
export interface SiteMap {
  site: Site
  pageMap: PageMap
  canonicalPageMap: CanonicalPageMap
}
export interface CanonicalPageMap {
  [canonicalPageId: string]: string
}
export interface PageError {
  message?: string
  statusCode: number
}

export interface PageProps {
  site?: Site
  recordMap?: ExtendedRecordMap
  pageId?: string
  error?: PageError
}

export interface Params extends ParsedUrlQuery {
  pageId: string
}