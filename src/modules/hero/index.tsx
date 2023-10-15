'use client'
import { HelloIcon } from '@/components/icons'
import { Link } from "@nextui-org/react"
import { MotionDiv } from "@/components/views"

export default function Hero() {
  return (
    <div className="flex flex-col h-full font-serif text-md text-neutral-800 dark:text-gray-300 lg:px-4">
      <div className='mb-8'>
        <MotionDiv delay={0.1} duration={1}>
          <div className="font-bold text-3xl lg:text-4xl tracking-wider text-gray-900  dark:text-neutral-200">
           Mintnoii
          </div>
        </MotionDiv>
        <MotionDiv delay={0.5} duration={0.6}>
          <div className="text-sm text-gray-500 dark:text-neutral-400">
           Qing
          </div>
        </MotionDiv>
      </div>
      <div className="mb-5">
        <MotionDiv delay={0.4} duration={0.8}>
          <div className='flex items-center'>
            <HelloIcon />
            <span className='ml-1'>Hey, I am Qing, my nickname is Mintnoii.</span>
          </div>
          <div>
            Welcome to my personal site build with love and bug. {`٩(•̀ω•́)◞♡ `}
          </div>
        </MotionDiv>
      </div>
      <div className='mb-5'>
        <MotionDiv delay={0.4} duration={0.8}>
          <div>
            I am a self-taught web developer.
            {` And I'm interested in the Jamstack & Serverless technology stack. `}
          </div>
          <div>
            Dreaming up ideas and making them come true is where my passion lies.
          </div>
        </MotionDiv>
      </div>
      <div className='mb-5'>
        <MotionDiv delay={0.4} duration={0.8}>
          <div>
            Outside of programming, I like playing games and trying all kinds of delicious food.
          </div>
        </MotionDiv>
      </div>
      <div className="mb-4">
        <MotionDiv delay={0.4} duration={0.8}>
          <div>
            Get to know what I am all <Link href="/about">about</Link> and my creative <Link href="/creating">output</Link>.
          </div>
          <div>
            Some of my work is open source and publicly available on <Link isExternal href="https://github.com/Mintnoii">github</Link>.
          </div>
        </MotionDiv>
      </div>
    </div>
  )
}
