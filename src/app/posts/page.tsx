import Image from 'next/image'
import {getPosts, getPage } from '@/lib/notion'
import '@/styles/global.css'
import Link from 'next/link'
import { ArticleList } from '@/components/blog/ArticleList'

// async function getPageData() {
//   const res = await getPage('fa134157f87b4a30be5712e13c1428df')
//  console.log('res', res)
//   return res
// }
 export default async function PostsPage() {
 const articles = await getPosts('2b33b4bab64d4aeb9ee8f62aabe1ae5d')
 console.log(articles,'articles')
const test = [{
  title: '从东大三扥扥'
}]
  return <section className='w-full'>
     <header>
       <h1>My Posts</h1>
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
