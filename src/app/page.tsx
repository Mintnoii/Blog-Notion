import Hero from '@/themes/hero'

import { getPage } from '@/services/notion'
import {renderBlocks} from '@/components/block-renderer'
import { AboutMe,MotionDiv } from "@/components/views"

async function SelfIntro() {
  const page = await getPage(process.env.NOTION_ABOUT_PAGE_ID || '')
  return (
    <>
    <AboutMe/>
    {/* {JSON.stringify(page)} */}
    <div className='mt-12 break-words max-w-xs md:max-w-lg'>
    <MotionDiv delay={0.5}>
     {renderBlocks(page.content)}
    </MotionDiv>
    </div></>
  )
}


 export default async function Home() {
  return (
    <section className='break-words max-w-xs md:max-w-lg lg:max-w-xl xl:max-w-2xl'>
      <SelfIntro/>
    </section>
  )
}
