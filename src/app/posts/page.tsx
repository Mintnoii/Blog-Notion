import Image from 'next/image'
import {equals, getPage } from '@/lib/notion'
import '@/styles/global.css'
import Link from 'next/link'


async function getData() {
  const res = await equals('2b33b4bab64d4aeb9ee8f62aabe1ae5d')
 console.log('getDatabase', res)
 return res as any
}
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

            {
             JSON.stringify(result.properties)
             }
           {/* <Link href={`/posts/${result.id}`}>
             <Image src={result.cover?.external?.url} width={300} height={200} alt="Picture of the author" />
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
