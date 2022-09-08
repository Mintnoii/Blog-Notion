// APP Config 模块
// 从 Notion URL 或路径名后缀中提取 Notion 页面 ID，默认返回一个 UUID(带破折号)
import { parsePageId } from 'notion-utils'
import rawSiteConfig from '../site.config'
import { SiteConfig } from '../types/site-config'


// 环境变量可以覆盖 site.config.ts
let siteConfigOverrides: SiteConfig
const siteConfig: SiteConfig = {
  ...rawSiteConfig,
  ...siteConfigOverrides
}
// 获取网站配置项的值
export function getSiteConfig<T>(key: string, defaultValue?: T): T {
  const value = siteConfig[key]

  if (value !== undefined) {
    return value
  }

  if (defaultValue !== undefined) {
    return defaultValue
  }

  throw new Error(`[🚧 配置错误] 缺少所需的配置名称 "${key}"`)
}

export const rootNotionPageId: string = parsePageId(
  getSiteConfig('rootNotionPageId'),
  { uuid: false }
)

if (!rootNotionPageId) {
  throw new Error('[🚧 配置错误] 无效的 "rootNotionPageId"')
}