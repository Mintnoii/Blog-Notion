import {getPublishedBlogs, getProjects } from '@/api'
import { Title, Description } from '@/components/typography'
import CreatingPanel from '@/app/creating/components/CreatingPanel'

const CreatingPage = async () => {
  const projects = await getProjects()

  return (
    <section className='w-full max-w-xs md:max-w-lg lg:max-w-xl xl:max-w-2xl pb-10'>
      <header>
        <Title>Creating</Title>
        <Description
        >
          These are things I have done or are developing for learning and fun.
        </Description>
      </header>
      {JSON.stringify(projects)}
      {/* <CreatingPanel blogs={blogs} tags={allTags}/> */}
    </section>
  )
}

export default CreatingPage