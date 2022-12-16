import {getPage,getPageContent,calcListItems } from '@/api'
import renderBlock from '@/components/render'
 export default async  function AboutPage() {
   const page = await getPageContent(process.env.NOTION_ABOUT_PAGE_ID || '')
  // console.log('page', page)
  const test = calcListItems(page)

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
    {JSON.stringify(test)}
    <div>
      {renderBlocks(page)}
      {/* {JSON.stringify(content)} */}
    </div>
    </>
  )
}

