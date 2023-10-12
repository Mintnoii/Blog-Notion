import {getPublishedBlogs, collectAllTags } from '@/services/notion'
import { Title, Description } from '@/components/typography'
import BlogPanel from '@/app/blog/components/BlogPanel'

const BlogPage = async () => {
  const blogs = await getPublishedBlogs()
  const allTags = await collectAllTags(blogs)

  return (
    <section className='w-full max-w-xs md:max-w-lg lg:max-w-xl xl:max-w-2xl pb-10'>
      <header>
        <Title>Blog</Title>
        <Description
        >
          This is where I write about programming, tech, life, and everything in
          between.
        </Description>
      </header>
      <BlogPanel blogs={blogs} tags={allTags}/>
  </section>
  )
}

export default BlogPage