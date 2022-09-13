import * as types from './index'
export interface SiteConfig {
  rootNotionPageId: string
  rootNotionSpaceId?: string

  name: string
  domain: string
  author: string
  description?: string
	bio?: string
	link?: string
	keywords?: Array<string>

	// 样式设置
	navStyle?: types.NavStyle
}


export const siteConfig = (config: SiteConfig): SiteConfig => {
  return config
}
