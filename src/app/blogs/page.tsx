import Image from 'next/image'
import {getBlogs,getWorkSpace } from '@/lib/notion'
import '@/styles/global.css'
import Link from 'next/link'
import { ArticleList } from '@/components/blog/ArticleList'
import { IArticle } from '@/lib/types'

export default async function PostsPage() {
  const blogsIds:string[] = JSON.parse(process.env.NOTION_BLOGS_IDS || '[]')
  const promiseArr = blogsIds.map((id:string) => getBlogs(id))
  const results = await Promise.allSettled(promiseArr)
  const articles = results.map((result:PromiseSettledResult<IArticle[]>) => result.status === 'fulfilled' ? result.value : []).flat()
   // blogs 即为所有博客数据组成的数组
    console.log(results ,'results111 ')
  // const articles = await getBlogs('2b33b4bab64d4aeb9ee8f62aabe1ae5d')
  // console.log(articles,'articles',blogsIds)
  const content = await getWorkSpace()
  // console.log(content,'content')
  return <section className='w-full'>
     <header>
       <h1>My Blogs</h1>
       {/* {JSON.stringify(results)} */}
     </header>
     <div>
       <ArticleList articles={articles} />
       {/* {
             JSON.stringify(articles)
             } */}
        {/* <Image src={result.cover?.external?.url} width={300} height={200} alt="Picture of the author" /> */}
             
           {/* <Link href={`/posts/${result.id}`}>
           </Link> */}
           {/* <div >
             <Link href={`/posts/${result.id}`}>
             </Link>
           </div> */}
     </div>
  </section>
}
