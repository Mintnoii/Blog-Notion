import * as React from 'react'
// import { motion, AnimateSharedLayout } from 'framer-motion'
import ThemeSwitch from '@/features/ThemeSwitch'

// import CommandPalette from '~/components/features/command-palette/CommandPalette'
// import Link from 'next/link'
// import { useRouter } from 'next/router'
// import classnames from 'classnames'
// import { navigation } from '~/data/nav'
// import DropMenu from './DropMenu'
// import AuthButton from '../auth/AuthButton'
// import { TBoxIcon } from '../icons/t-box'

export default function Navbar() {
  // const { pathname } = useRouter()
  // const [activeIndex, setActiveIndex] = React.useState(null)
  // const [isOpen, setisOpen] = React.useState()
  return (
    <nav className="flex flex-col  max-w-sm mt-4  w-full pt-2 pb-4 md:max-w-2xl ">
      <div className="flex flex-row justify-between ">
        {/* <Link href="/">
          <a>
            <TBoxIcon className="cursor-pointer mr-auto h-8 ml-2 w-8" />
          </a>
  </Link>*/}
        {/* <AnimateSharedLayout>
          <motion.ul
            className="flex font-serif text-sm gap-y-1  md:gap-x-4 dark:text-gray-300 "
            onHoverEnd={() => setActiveIndex(null)}
          >
            {navigation.navData.map((item, index) => {
              const isActive = activeIndex === index
              return (
                <motion.li
                  key={index}
                  onHoverStart={() => setActiveIndex(index)}
                >
                  <Link href={item.path}>
                    <a
                      className={classnames(
                        'relative block px-2 py-2',
                        ['text-gray-600 hover:text-gray-700'],
                        ['dark:text-gray-300 dark:hover:text-white']
                      )}
                      aria-current={pathname === item.path ? 'page' : null}
                    >
                      <span
                        className={`relative z-50 ${
                          pathname === item.path
                            ? 'font-semibold  text-gray-900 underline decoration-cyan-500 decoration-2 underline-offset-1 dark:text-gray-300 '
                            : 'font-normal text-gray-700 dark:text-gray-400'
                        }`}
                      >
                        {item.label}
                      </span>
                      {isActive && (
                        <motion.span
                          layoutId="shadow"
                          transition={{
                            duration: 0.2,
                          }}
                          className={classnames(
                            'pointer-events-none absolute inset-0 z-0 rounded-md',
                            ['bg-zinc-300'],
                            ['dark:bg-zinc-800']
                          )}
                        />
                      )}
                    </a>
                  </Link>
                </motion.li>
              )
            })}
          </motion.ul>
        </AnimateSharedLayout> */}
        <div className="flex ">
          {/* <CommandPalette navigation={navigation} /> */}
          <ThemeSwitch />
          {/* <DropMenu /> */}
        </div>
      </div>
    </nav>
  )
}
