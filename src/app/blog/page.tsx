import {collectAllTags } from '@/services/notion'
import {getThinking } from '@/api'
import { Title, Description } from '@/components/typography'
import { PostTable, TagsCard } from '@/widgets'
import { useState } from 'react'
import { ITag, IPost } from '@/services/notion/types'

const BlogPage = async () => {
  const posts = await getThinking()
  // console.log(posts,'posts')
  const allTags = await collectAllTags(posts)
// const [tagName, setTagName] = useState('All')
const test = () => {
  console.log('test')
}

  // const tagFilter = () => posts.filter(i => tagName === 'All' || i.tags?.some(tag => tag.name === tagName))
  // const filteredBlogs = tagFilter(posts)
  return (
    <section className='max-w-xs w-full md:max-w-lg lg:max-w-xl xl:max-w-2xl'>
      <header>
        <Title>Blog</Title>
        <Description
        >
          This is where I write about programming, tech, life, and everything in
          between.
        </Description>
      </header>
      {/* <section>
        <TagsCard tags={allTags} />
      </section> */}
      <PostTable  posts={posts} />
      {/* <BlogPanel posts={posts} tags={allTags}/> */}
  </section>
  )
}

export default BlogPage