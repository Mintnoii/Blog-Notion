// import Image from 'next/image'
import { GetStaticProps } from 'next'
import {getDatabase, getPage } from '@/lib/notion'

async function getData() {
  const res = await getPage(process.env.NOTION_ABOUT_PAGE_ID || '')
 console.log('res', res)
}
export const getStaticProps: GetStaticProps = async () => {
  const data = await getDatabase('')
  console.log('data', data)
  return {
    props:{
      data
    }
  }
}


 export default async  function AboutPage() {
  await getData()
  return <h1>关于我</h1>
}
