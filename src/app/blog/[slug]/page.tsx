import {getPublishedBlogs,getPage } from '@/api'
import {renderBlocks} from '@/components/block-renderer'
import { Title, Description } from '@/components/typography'
import {ScrollShadow} from "@nextui-org/react"

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

  // return (
  //   <div className="grid grid-cols-12 gap-2 max-w-xs md:max-w-3xl">
  //     {/* <section className='max-w-2xl break-all md:max-w-lg lg:max-w-xl xl:max-w-2xl '> */}
  //     <div  className='break-all col-start-2 md:col-start-2 md:col-span-10 col-span-10 '>
  //   {/* <ScrollShadow hideScrollBar> */}
  //     {/* {JSON.stringify(page)} */}
  //     <Title>{page.name}</Title>
  //     {/* todo tags */}
  //      {renderBlocks(page.content)}
  //   {/* </ScrollShadow> */}
  //     </div>
  //     {/* </section> */}
  //    <div className='col-start-11 col-span-2 z-10 mt-8 pl-4 hidden md:flex'>
  //     <div className="fixed w-full max-w-[12rem] flex flex-col h-[calc(100vh-121px)] scrollbar-hide overflow-y-scroll">
  //       outline
  //     </div>
  //   </div>
  //   </div>
  // )
  return (
    <div className="flex relative">
      {/* <section className='max-w-2xl break-all md:max-w-lg lg:max-w-xl xl:max-w-2xl '> */}
      <div className='break-all max-w-xs md:max-w-3xl'>
      {/* {JSON.stringify(page)} */}
      <Title>{page.name}</Title>
       {renderBlocks(page.content)}
      </div>
      {/* </section> */}
     <div>
      <div className="fixed w-full max-w-[12rem] flex flex-col h-100vh scrollbar-hide overflow-y-scroll">
        outline
      </div>
     </div>
    </div>
  )
}

export default BlogSlugPage
