import {getPage } from '@/api'
import renderBlock from '@/components/render'
 export default async  function AboutPage() {
   const page = await getPage(process.env.NOTION_ABOUT_PAGE_ID || '')
  console.log('page', page)
  const content = page.contentInfo

  const renderBlocks = (blocks:any) => {
    // console.log(blocks,'blocks');
    return blocks.map((block:any) => (
      <div key={block.id}>
        {renderBlock(block)}
      </div>
    ))
  }

  return (
    <>
    {JSON.stringify(page)}
    <div>
      {renderBlocks(content)}
      {/* {JSON.stringify(content)} */}
    </div>
    </>
  )
}

