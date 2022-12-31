import {getPublishedBlogs } from '@/api'
import { Title, Description } from '@/components/typography'
import BlogCard from '@/app/blog/components/BlogCard'

const BlogPage = async () => {
  const blogs = await getPublishedBlogs()

  return (
    <section className='max-w-2xl break-all md:max-w-lg lg:max-w-xl xl:max-w-2xl'>
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
        {/* <Image src={result.cover?.external?.url} width={300} height={200} alt="Picture of the author" /> */}
      </div>
  </section>
  )
}

export default BlogPage