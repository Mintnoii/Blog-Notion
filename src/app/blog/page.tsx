import {getPublishedBlogs,getBlogs } from '@/api'
import ArticleList from '@/components/blog/ArticleList'
import { Title, Description } from '@/components/typography'
import { IArticle } from '@/types/data'
import BlogCard from '@/app/blog/components/BlogCard'
import { Metadata, ResolvingMetadata } from 'next'

type Props = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}
export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const id = params.id || 'fa134157-f87b-4a30-be57-12e13c1428df'
  // fetch data
  const product = await fetch(`https://.../${id}`).then((res) => res.json())
  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || []
  return {
    title: product.title,
    openGraph: {
      images: ['/some-specific-page-image.jpg', ...previousImages],
    },
  }
}

const BlogPage = async () => {
  // const articles = await getPublishedBlogs()
    const blogsIds:string[] = JSON.parse(process.env.NOTION_BLOGS_IDS || '[]')
  const promiseArr = blogsIds.map((id:string) => getBlogs(id))
  const results = await Promise.allSettled(promiseArr)
  const blogs = results.map((result:PromiseSettledResult<IArticle[]>) => result.status === 'fulfilled' ? result.value : []).flat()

  return (
    <>
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
       {/* { JSON.stringify(articles)} */}
       {/* <ArticleList articles={blogs} /> */}
        {/* <Image src={result.cover?.external?.url} width={300} height={200} alt="Picture of the author" /> */}
     </div>
  </>
  )
}

export default BlogPage