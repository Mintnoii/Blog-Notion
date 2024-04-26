import {collectAllTags } from '@/services/notion'
import {getThinking } from '@/api'
import { Title, Description } from '@/components/typography'
// import BlogPanel from '@/components/blog-panel'
import BlogTable from '@/components/blog-table'
const BlogPage = async () => {
  const blogs = await getThinking()
  // console.log(blogs,'blogs')
  const allTags = await collectAllTags(blogs)

  return (
    <section className='max-w-xs w-full md:max-w-lg lg:max-w-xl xl:max-w-2xl'>
      <header>
        <Title>Blog</Title>
        <Description
        >
          This is where I write about programming, tech, life, and everything in
          between.
        </Description>
      </header>
      <BlogTable  blogs={blogs} />
      {/* <BlogPanel blogs={blogs} tags={allTags}/> */}
  </section>
  )
}

export default BlogPage