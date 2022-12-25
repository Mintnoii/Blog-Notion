import React from 'react'
import { Title, Description } from '@/components/typography'
import {UnhappyIcon} from '@/components/icons'

const NotFound = () => {
  return (
    <div className='flex flex-col justify-center items-center'>
      <Title>
        <div className='flex  items-center'>
          <UnhappyIcon className='w-16 h-16'/>
          <span className='mx-2'>404</span>
          <span className='text-base'>Page not found.</span>
        </div>
      </Title>
      <Description>
         {`“一切有为法，如梦幻泡影，如露亦如电，应作如是观。”`}
      </Description>
    </div>
  )
}

export default NotFound
