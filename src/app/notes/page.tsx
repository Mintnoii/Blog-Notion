import {collectAllTags } from '@/services/notion'
import {getPublishedPosts } from '@/api'
import { Title, Description } from '@/components/typography'
import { PostTable } from '@/widgets'
const NotePage = async () => {
  const posts = await getPublishedPosts()
  // console.log(posts,'posts')
  const allTags = await collectAllTags(posts)

  return (
    <section className='max-w-xs w-full md:max-w-lg lg:max-w-xl xl:max-w-2xl'>
      <header>
        <Title>Notes</Title>
        <Description
        >
          This is where I write about programming, tech, life, and everything in
          between.
        </Description>
      </header>
      <PostTable  posts={posts} />
  </section>
  )
}

export default NotePage