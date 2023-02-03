import { Title, Description } from '@/components/typography'
import {getProjects} from '@/services/notion'
import ProjectCards from '@/modules/project/cards'

const CreatingPage = async () => {
  // const projects = await getProjects()
  // console.log(projects,'projects');
  return (
    <section className='w-full max-w-xs md:max-w-lg lg:max-w-xl xl:max-w-2xl pb-10'>
      <header>
        <Title>Thinking</Title>
        <Description
        >
          {`To learn without thinking is confusing`}
        </Description>
      </header>
      {/* <ProjectCards projects={projects}/> */}
      {/* {JSON.stringify(projects)} */}
    </section>
  )
}

export default CreatingPage