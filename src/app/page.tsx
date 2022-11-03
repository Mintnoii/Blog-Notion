import Image from 'next/image'
import { GetStaticProps } from 'next'
import {getDatabase, getPage } from '@/lib/notion'
import '@/styles/global.css'

 export default function Home() {
  return <main><h1>Hello, Next.js!</h1></main>
}
