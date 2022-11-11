import Image from 'next/image'
import { GetStaticProps } from 'next'
import {getDatabase, getPage } from '@/lib/notion'

async function getData() {
  const res = await getDatabase('2b33b4bab64d4aeb9ee8f62aabe1ae5d')
 console.log('getDatabase', res)
}
 export default async function Home() {
  await getData()
  return <main><h1>Hello, Next.js!</h1></main>
}
