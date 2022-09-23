import Image from 'next/image'
import { GetStaticProps } from 'next'
import {getDatabase, getPage } from '@/lib/notion'

export const getStaticProps: GetStaticProps = async () => {
  const data = await getDatabase('')
  console.log('data', data)
  return {
    props:{
      data
    }
  }
  // const { articles, tags } = convertToArticleList(data)

  // const featuredArticle = articles[0]

  // return {
  //   props: {
  //     featuredArticle,
  //     articles: articles.slice(0),
  //     tags,
  //   },
  //   revalidate: 30,
  // }
}


 export default function Home() {
  return <main><h1>Hello, Next.js!</h1></main>
}
