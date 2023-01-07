import {getPublishedBlogs, collectAllTags } from '@/api'
import { Title, Description } from '@/components/typography'
import BlogCard from '@/app/blog/components/BlogCard'

const BlogPage = async () => {
  const blogs = await getPublishedBlogs()
  const allTags = await collectAllTags(blogs)
  return (
    <section className='max-w-xs md:max-w-lg lg:max-w-xl xl:max-w-2xl '>
      <header>
        <Title>Blog</Title>
        <Description
        >
          This is where I write about programming, tech, life, and everything in
          between.
        </Description>
      </header>
      <div>
        {blogs.map((article) => (
          <BlogCard key={article.id} article={article}></BlogCard>
        ))}
      </div>
  </section>
  )
}

export default BlogPage