import { Title, Description } from '@/components/typography'
import {getProjects} from '@/services/notion'
import ProjectsPanel from '@/app/creating/components/ProjectsPanel'

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
      <ProjectsPanel projects={projects}/>
      {/* {JSON.stringify(projects)} */}
    </section>
  )
}

export default CreatingPage