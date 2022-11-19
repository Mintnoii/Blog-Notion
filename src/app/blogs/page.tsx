import Image from 'next/image'
import {getBlogs,getWorkSpace } from '@/lib/notion'
import '@/styles/global.css'
import Link from 'next/link'
import { ArticleList } from '@/components/blog/ArticleList'

 export default async function PostsPage() {
  const articles = await getBlogs('2b33b4bab64d4aeb9ee8f62aabe1ae5d')
  console.log(articles,'articles')
  const content = await getWorkSpace()
  console.log(content,'content')
  return <section className='w-full'>
     <header>
       <h1>My Blogs</h1>
     </header>
    <div>
      {JSON.stringify(content)}
    </div>
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
