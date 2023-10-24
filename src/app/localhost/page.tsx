import { getPage } from '@/services/notion'
import {renderBlocks} from '@/components/block-renderer'
import { MotionDiv } from "@/components/views"
import { Title, Description } from '@/components/typography'
import Outline from '@/app/blog/components/Outline'

export default async function LocalhostPage() {
  const page = await getPage(process.env.NOTION_LOCALHOST_PAGE_ID || '')
  return (
    <div className="flex relative">
      <div className='break-words max-w-xs md:max-w-lg lg:max-w-xl xl:max-w-2xl pb-10'>
        <header>
          <Title>{page.name}</Title>
          {/* <Description
          >
            This is where I write about programming, tech, life, and everything in
            between.
          </Description> */}
        </header>
        <MotionDiv delay={0.5}>
          {renderBlocks(page.content)}
        </MotionDiv>
      </div>
      <Outline content={page.content} />
    </div>
  )
}

