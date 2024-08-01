import {getPublishedPosts,getPage } from '@/services/notion'
import {renderBlocks} from '@/components/block-renderer'
import { Title, Description } from '@/components/typography'
import Outline from '@/components/outline-list'
interface Props {
  params: {
    slug: string
  }
}
export async function generateStaticParams() {
  const posts = await getPublishedPosts()
  return posts.map((note) => ({ slug: note.id}))
}

const NoteSlugPage = async ({ params }: Props) => {
  const page = await getPage(params.slug)
  return (
    <div className="flex relative">
      <div className='content-wrapper pb-10'>
      {/* {JSON.stringify(page.content)} */}
      <Title>{page.name}</Title>
       {renderBlocks(page.content)}
      </div>
      <Outline content={page.content} />
    </div>
  )
}

export default NoteSlugPage
