import {getBlockContent, getPage } from '@/lib/notion'
 export default async  function AboutPage() {
   let content = []
   const page = await getPage(process.env.NOTION_ABOUT_PAGE_ID || '')
 console.log('page', page)
  // const contents = await getBlockContent(page.id)
    let blocks = await getBlockContent(page.id)
      content = [...blocks.results]
  while (blocks.has_more) {
    blocks = await getBlockContent(
      page.id,
      blocks.next_cursor
    )

    content = [...content, ...blocks.results]
  }
  return (
    <>
    {/* {JSON.stringify(page)} */}
    <div>
      {JSON.stringify(content)}
    </div>
    </>
  )
}
