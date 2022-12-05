import {getAllBlockContent, getPage } from '@/lib/notion'
 export default async  function AboutPage() {
   const page = await getPage(process.env.NOTION_ABOUT_PAGE_ID || '')
   const content = await getAllBlockContent(page.id)
  console.log('page', page)
  return (
    <>
    {JSON.stringify(page)}
    <div>
      {/* {JSON.stringify(content)} */}
    </div>
    </>
  )
}
