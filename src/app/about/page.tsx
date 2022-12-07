import {getPage } from '@/api'
 export default async  function AboutPage() {
   const page = await getPage(process.env.NOTION_ABOUT_PAGE_ID || '')
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
