import {getPublishedBlogs,getPage } from '@/api'
import {renderBlocks} from '@/components/block-renderer'
import { Title, Description } from '@/components/typography'
import {ScrollShadow} from "@nextui-org/scroll-shadow"

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
    <div className="grid grid-cols-12 gap-4">
      {/* <section className='max-w-2xl break-all md:max-w-lg lg:max-w-xl xl:max-w-2xl'> */}
      <div  className='col-start-3 col-span-8 max-w-2xl md:max-w-lg lg:max-w-xl xl:max-w-2xl'>
         <ScrollShadow hideScrollBar>
      {/* {JSON.stringify(page)} */}
      <Title>{page.name}</Title>
      {/* todo tags */}
       {renderBlocks(page.content)}
    </ScrollShadow>
      </div>
      {/* </section> */}
     <div className='col-start-11 col-span-2 z-10 mt-8 pl-4'>
      {/* <div className="fixed w-full max-w-[12rem] flex flex-col h-[calc(100vh-121px)] scrollbar-hide overflow-y-scroll">
        outline
      </div> */}
    </div>
    </div>
  )
}

export default BlogSlugPage
