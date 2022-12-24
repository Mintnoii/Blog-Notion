import {getPage } from '@/api'
import {renderBlocks} from '@/features/BlockRenderer'

const ArticlePage = async () => {
  const page = await getPage('fa134157-f87b-4a30-be57-12e13c1428df')

  return (
    <div>
      {/* {JSON.stringify(page.content)} */}
      {renderBlocks(page.content)}
    </div>
  )
}

export default ArticlePage
