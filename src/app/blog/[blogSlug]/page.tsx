import {getPage } from '@/api'
import {renderBlock} from '@/features/BlockRenderer'

const ArticlePage = async () => {
  const page = await getPage('fa134157-f87b-4a30-be57-12e13c1428df')

  const renderBlocks = (blocks:any) => {
    return blocks.map((block:any) => (
      <div key={block.id} className='py-1 px-0.5'>
        {renderBlock(block)}
      </div>
    ))
  }

  return (
    <div>
      {renderBlocks(page.content)}
    </div>
  )
}

export default ArticlePage
