import Image from 'next/image'
import {equals, getPage } from '@/lib/notion'
import '@/styles/global.css'
import Link from 'next/link'


async function getData() {
  const res = await equals('2b33b4bab64d4aeb9ee8f62aabe1ae5d')
 console.log('getDatabase', res)
 return res as any
}
// async function getPageData() {
//   const res = await getPage('fa134157f87b4a30be5712e13c1428df')
//  console.log('res', res)
//   return res
// }
 export default async function PostsPage() {
 const results = await getData()
  return <section>
     <header>
       <h1>Latest posts</h1>
     </header>

     <main>

       {
         results?.map((result:any,index:any) => {
         return (
           <div  key={index}>
            <Image src={result.cover?.external?.url} width={300} height={200} alt="Picture of the author" />
            {
             JSON.stringify(result)
             }
           {/* <Link href={`/posts/${result.id}`}>
           </Link> */}
           {/* <div >
             <Link href={`/posts/${result.id}`}>
             </Link>
           </div> */}
           </div>
           )
         })
       }
     </main>

     <footer>
       <p>Blog application</p>
     </footer>
  </section>
}
