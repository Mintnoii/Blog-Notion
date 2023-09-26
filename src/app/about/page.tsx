import {getPage } from '@/api'
import {renderBlocks} from '@/components/block-renderer'
import { AboutMe,MotionDiv } from "@/components/views"

export default async  function AboutPage() {
  const page = await getPage(process.env.NOTION_ABOUT_PAGE_ID || '')
  return (
    <div className='pt-8 break-words max-w-xs md:max-w-lg lg:max-w-xl xl:max-w-2xl '>
      <AboutMe/>
      {/* {JSON.stringify(page)} */}
    <div className='mt-12 break-words max-w-xs md:max-w-lg'>
      <MotionDiv delay={0.5}>
     {renderBlocks(page.content)}
    </MotionDiv>
    </div>
    </div>
  )
}

