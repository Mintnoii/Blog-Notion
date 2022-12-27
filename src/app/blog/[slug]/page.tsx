import {getPublishedBlogs,getPage } from '@/api'
import {renderBlocks} from '@/features/BlockRenderer'

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
    <div>
      {/* {JSON.stringify(page.content)} */}
      {/* {JSON.stringify(params)} */}
       {renderBlocks(page.content)}
    </div>
  )
}

export default BlogSlugPage
