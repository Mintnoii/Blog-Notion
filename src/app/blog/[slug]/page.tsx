import {getPublishedBlogs,getPage } from '@/services/notion'
import {renderBlocks} from '@/components/block-renderer'
import { Title, Description } from '@/components/typography'
import Outline from '@/app/blog/components/Outline'
interface Props {
  params: {
    slug: string
  }
}
export async function generateStaticParams() {
  const blogs = await getPublishedBlogs()
  return blogs.map((blog) => ({ slug: blog.id}))
}

const BlogSlugPage = async ({ params }: Props) => {
  const page = await getPage(params.slug)
  return (
    <div className="flex relative">
      <div className='break-words max-w-xs md:max-w-lg lg:max-w-xl xl:max-w-2xl pb-10'>
      {/* {JSON.stringify(page.content)} */}
      <Title>{page.name}</Title>
       {renderBlocks(page.content)}
      </div>
      <Outline content={page.content} />
    </div>
  )
}

export default BlogSlugPage
