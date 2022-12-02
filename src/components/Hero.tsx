'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'

const CustomLink = (href:string, text:string) => {
  return (
    <Link href={href} className="relative before:h-full before:bg-indigo-400 before:w-full before:opacity-50 before:origin-bottom before:transition-transform before:ease-in-out before:bottom-0 before:left-0 before:scale-y-[0.35] before:duration-500 before:absolute hover:before:scale-y-100">
      <span className="relative hover:text-gray-800 hover:dark:text-gray-200">
        {text}
      </span>
    </Link>
  )
}

export default function Hero() {
  return (
    <div>
      <div className="flex flex-col min-h-screen pb-[25vh] justify-center lg:mt-12 lg:px-4">
        <div>
          <motion.div
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.1, duration: 1 }}
            variants={{
              hidden: {
                opacity: 0,
                y: 100,
              },
              visible: {
                opacity: 1,
                y: 0,
              },
            }}
            className=" font-bold text-xl tracking-wider text-gray-900 lg:text-4xl dark:text-neutral-200"
          >
            Mintnoii
          </motion.div>
          <motion.div
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.3, duration: 0.8 }}
            variants={{
              hidden: {
                opacity: 0,
              },
              visible: {
                opacity: 1,
              },
            }}
            className="text-sm mb-2 text-gray-500 dark:text-neutral-400"
          >
            Qing
          </motion.div>
        </div>
        <div className="font-serif mt-8 text-md text-gray-800 dark:text-neutral-400  ">
          <motion.div
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.4, duration: 0.8 }}
            variants={{
              hidden: {
                opacity: 0,
                y: 100,
              },
              visible: {
                opacity: 1,
                y: 0,
              },
            }}
            className="mb-4 "
          >
           {`Hello! I am a self taught web developer currently focused on
            typescript, nextjs, tailwind and vue. Some of my work is open source and publicly available on `}
            {CustomLink('https://github.com/Mintnoii', 'github')}.
          </motion.div>
          <motion.div
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.4, duration: 0.8 }}
            variants={{
              hidden: {
                opacity: 0,
                y: 100,
              },
              visible: {
                opacity: 1,
                y: 0,
              },
            }}
            className="mb-4 "
          >
            {`Get to know what I'm all `}
            {CustomLink('/about', 'about')}
            {` or what I'm doing `}
            {CustomLink('/about', 'now')}.
          </motion.div>
          <motion.div
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.6, duration: 0.7 }}
            variants={{
              hidden: {
                opacity: 0,
                y: 100,
              },
              visible: {
                opacity: 1,
                y: 0,
              },
            }}
          >
            {`I'm open for work or just a chat. Email me at `}
            {CustomLink('mailto:MintnoiiQing@gmail.com','MintnoiiQing@gmail.com')}.
          </motion.div>
        </div>
      </div>
    </div>
  )
}
