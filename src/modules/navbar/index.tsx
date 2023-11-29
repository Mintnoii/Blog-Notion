'use client'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import * as React from 'react'
import { NAV_DATA } from '@/constants/nav'
import { motion } from 'framer-motion'
import ThemeSwitch from '@/modules/navbar/ThemeSwitch'
import classnames from 'classnames'
import { Button } from "@nextui-org/react"
import Menu from '@/modules/navbar/Menu'
import {Link} from '@/components/ui'

// import CommandPalette from '~/components/features/command-palette/CommandPalette'
// import AuthButton from '../auth/AuthButton'
// import { TBoxIcon } from '../icons/t-box'

const Navbar = () => {
  const pathname = usePathname()
  const router = useRouter()
  return (
    <nav className="flex bg-background/70 h-16 inset-x-0 top-0 z-40 justify-center sticky backdrop-blur-lg backdrop-saturate-150">
      <div className="flex max-w-xs w-full justify-between items-center md:max-w-lg lg:max-w-xl xl:max-w-2xl">
        <motion.button whileHover={{ scale: 1.2, transition: { duration: 0.2 } }}>
          <span className='font-bold'>Mintnoii</span>
        </motion.button>
        <div className='flex flex-row justify-center'>
          {
            NAV_DATA.map((item) => {
              const isCurrent = pathname === item.path
              const linkSpanStyle = classnames(
                'relative z-50 hidden md:block',
                {
                  'font-semibold text-gray-900 underline decoration-cyan-400 decoration-2 underline-offset-1 dark:text-gray-300 ': isCurrent,
                  'font-normal text-gray-700 dark:text-gray-400': !isCurrent
                })
              return (
                <Button size="sm" key={item.path} variant="light">
                  <Link  href={item.path} className="text-gray-600 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white">
                    <span className={linkSpanStyle}>
                      {item.label}
                    </span>
                  </Link>
                </Button>
              )
            })
          }
        </div>
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