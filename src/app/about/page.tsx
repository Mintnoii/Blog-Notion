import {getPage } from '@/api'
import {renderBlocks} from '@/features/BlockRenderer'

export default async  function AboutPage() {
  const page = await getPage(process.env.NOTION_ABOUT_PAGE_ID || '')
  return (
    <div className='pt-8'>
      {/* {JSON.stringify(page)} */}
      {renderBlocks(page.content)}
    </div>
  )
}

