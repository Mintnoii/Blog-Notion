'use client'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import * as React from 'react'
import { navData } from '@/constants/nav'
import { motion } from 'framer-motion'
import ThemeSwitch from '@/modules/navbar/ThemeSwitch'
import classnames from 'classnames'
import { Listbox, ListboxItem } from "@nextui-org/react"
import Menu from '@/modules/navbar/Menu'
import {Link} from '@/components/ui'

// import CommandPalette from '~/components/features/command-palette/CommandPalette'
// import AuthButton from '../auth/AuthButton'
// import { TBoxIcon } from '../icons/t-box'

const Navbar = () => {
  const pathname = usePathname()
  const router = useRouter()
  return (
    <nav className="flex justify-center z-40 h-16 sticky top-0 inset-x-0 backdrop-blur-lg backdrop-saturate-150 bg-background/70">
      <div className="flex justify-between w-full max-w-xs md:max-w-lg lg:max-w-xl xl:max-w-2xl items-center">
        <motion.button whileHover={{ scale: 1.2, transition: { duration: 0.2 } }}>
          <span className='font-bold'>Mintnoii</span>
        </motion.button>
        <Listbox variant='flat' aria-label="navbar" className='flex flex-row justify-center'>
          {
            navData.map((item) => {
              const isCurrent = pathname === item.path
              const linkSpanStyle = classnames(
                'relative z-50 hidden md:block',
                {
                  'font-semibold text-gray-900 underline decoration-cyan-400 decoration-2 underline-offset-1 dark:text-gray-300 ': isCurrent,
                  'font-normal text-gray-700 dark:text-gray-400': !isCurrent
                })
              return (
                <ListboxItem textValue={item.label} className="w-fit mx-0.5 inline-block" key={item.path} onClick={() => router.push(item.path)}>
                  <Link href={item.path} className="text-gray-600 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white">
                    <span className={linkSpanStyle}>
                      {item.label}
                    </span>
                  </Link>
                </ListboxItem>
              )
            })
          }
        </Listbox>
        <div className="flex">
          {/* <CommandPalette navigation={navigation} /> */}
          <ThemeSwitch />
          {/* <div className="ml-1 block md:invisible"> */}
            <Menu />
          {/* </div> */}
        </div>
      </div>
    </nav>
  )
}
export default Navbar