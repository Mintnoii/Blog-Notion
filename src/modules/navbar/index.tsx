'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import * as React from 'react'
import { navData } from '@/constants/nav'
import { motion } from 'framer-motion'
import ThemeSwitch from '@/modules/navbar/components/ThemeSwitch'
import classnames from 'classnames'
import Menu from '@/modules/navbar/components/Menu'
// import CommandPalette from '~/components/features/command-palette/CommandPalette'
// import AuthButton from '../auth/AuthButton'
// import { TBoxIcon } from '../icons/t-box'

const Navbar = () => {
  const pathname = usePathname()
  const [activeIndex, setActiveIndex] = React.useState<number|null>(null)
  // const [isOpen, setisOpen] = React.useState()
  return (
    <nav className="flex z-40 h-16 sticky top-0 inset-x-0 backdrop-blur-lg backdrop-saturate-150 bg-background/70">
      <div className="flex justify-between w-full mx-auto max-w-xs md:max-w-lg lg:max-w-xl xl:max-w-2xl items-center">
        <motion.button whileHover={{ scale: 1.2, transition: { duration: 0.2 }}}>
          <span className='font-bold'>Mintnoii</span>
        </motion.button>
          <motion.ul
            className="flex font-serif text-sm gap-y-1  md:gap-x-4 dark:text-gray-300 "
            onHoverEnd={() => setActiveIndex(null)}
          >
            {navData.map((item, index) => {
              const isActive = activeIndex === index
              const isCurrent = pathname === item.path
              const linkSpanStyle = classnames({
                'relative z-50': true,
                'font-semibold  text-gray-900 underline decoration-cyan-400 decoration-2 underline-offset-1 dark:text-gray-300 ': isCurrent,
                'font-normal text-gray-700 dark:text-gray-400': !isCurrent
              })
              return (
                <motion.li
                  key={index}
                  onHoverStart={() => setActiveIndex(index)}
                >
                  <Link href={item.path} passHref className={classnames(
                        'relative block px-2 py-2',
                        ['text-gray-600 hover:text-gray-700'],
                        ['dark:text-gray-300 dark:hover:text-white']
                      )}
                     >
                      <span className={linkSpanStyle}>
                        {item.label}
                      </span>
                      {isActive && (
                        <motion.span
                          layoutId="shadow"
                          transition={{ duration: 0.2 }}
                          className={classnames(
                            'pointer-events-none absolute inset-0 z-0 rounded-md',
                            ['bg-zinc-300'],
                            ['dark:bg-zinc-800']
                          )}
                        />
                      )}
                  </Link>
                </motion.li>
              )
            })}
          </motion.ul>
        <div className="flex ">
          {/* <CommandPalette navigation={navigation} /> */}
          <ThemeSwitch />
          <Menu />
        </div>
      </div>
    </nav>
  )
}
export default Navbar