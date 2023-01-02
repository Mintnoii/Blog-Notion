import {getPage } from '@/api'
import {renderBlocks} from '@/components/block-renderer'

export default async  function AboutPage() {
  const page = await getPage(process.env.NOTION_ABOUT_PAGE_ID || '')
  return (
    <div className='pt-8 max-w-2xl break-all md:max-w-lg lg:max-w-xl xl:max-w-2xl xs:max-w-xs'>
      {/* {JSON.stringify(page)} */}
      {renderBlocks(page.content)}
    </div>
  )
}

