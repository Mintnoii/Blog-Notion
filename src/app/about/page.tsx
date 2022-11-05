// import Image from 'next/image'
import { GetStaticProps } from 'next'
import {getDatabase, getPage } from '@/lib/notion'
import { GetPageResponse, PageObjectResponse, PartialPageObjectResponse } from '@notionhq/client/build/src/api-endpoints'

async function getData() {
  const res = await getPage(process.env.NOTION_ABOUT_PAGE_ID || '') as PageObjectResponse
 console.log('res', res)
   console.log(res.properties.title)

}


 export default async  function AboutPage() {
  await getData()
  return <h1>关于我</h1>
}
