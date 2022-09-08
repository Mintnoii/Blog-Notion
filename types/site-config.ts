
export interface SiteConfig {
  rootNotionPageId: string
  // rootNotionSpaceId?: string

  name: string
  author: string
  description?: string
	bio?: string
	link?: string
	keywords?: Array<string>

}


export const siteConfig = (config: SiteConfig): SiteConfig => {
  return config
}
