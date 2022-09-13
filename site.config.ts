import { siteConfig } from './types/site-config'

export default siteConfig({
  rootNotionPageId: process.env.ROOT_NOTION_PAGE_ID || 'a2d338fb2c0c4522a7aca806b4eb599a', // 根页面 id 必填！！
	// process.env.XX 是 Vercel的环境变量 https://docs.tangly1024.com/zh/features/personality
	rootNotionSpaceId: null,
	name: 'Mintoii', // 网站名称
  author: 'Mintnoii', // 作者
	bio: '这个人很酷😎',  // 个人经历简介
	description: `mintnoii's blog`,
	domain: 'www.mintnoii.com',
  link: 'www.mintnoii.com',
	keywords: ['Mintnoii','notion','blog','博客'], // 网站关键词

	// 样式设置
	navStyle: 'custom'
})
