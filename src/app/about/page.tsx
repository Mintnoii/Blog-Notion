import {getPage } from '@/api'
import renderBlock from '@/components/render'

export default async  function AboutPage() {
  const page = await getPage(process.env.NOTION_ABOUT_PAGE_ID || '')

  const renderBlocks = (blocks:any) => {
    return blocks.map((block:any) => (
      <div key={block.id}>
        {renderBlock(block)}
      </div>
    ))
  }

  return (
    <div className='pt-8'>
      {/* {JSON.stringify(page)} */}
      {renderBlocks(page.content)}
    </div>
  )
}

