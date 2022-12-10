import {getPage } from '@/api'
import RenderBlocks from '@/components/render'
 export default async  function AboutPage() {
   const page = await getPage(process.env.NOTION_ABOUT_PAGE_ID || '')
  console.log('page', page)
  const content = page.contentInfo
  return (
    <>
    {JSON.stringify(page)}
    <div>
      {RenderBlocks(content?.[1])}
      {/* {JSON.stringify(content)} */}
    </div>
    </>
  )
}
