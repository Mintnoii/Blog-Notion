'use client'
import React from "react";
import { Navbar, NavbarBrand, NavbarMenuToggle, NavbarMenuItem, NavbarMenu, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";
// import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import classnames from 'classnames'
import ThemeSwitch from './ThemeSwitch'
import Menu from './Menu'
import { NAV_DATA,MENU_DATA } from './data'

export default function Nav() {
  const pathname = usePathname()
  // const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  return (
    <Navbar
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <span className='font-bold'>Mintnoii</span>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-6" justify="center">
        {
          NAV_DATA.map((item) => {
            const isActive = pathname === item.path
            const linkSpanStyle = classnames(
              'relative z-50 hidden md:block',
              {
                'font-semibold text-gray-900 underline decoration-cyan-400 decoration-2 underline-offset-1 dark:text-gray-300 ': isActive,
                'font-normal text-gray-700 dark:text-gray-400': !isActive
              })
            return (
              <NavbarItem key={item.path} isActive={isActive}>
                <Link href={item.path}>
                  <span className={linkSpanStyle}>
                    {item.label}
                  </span>
                </Link>
              </NavbarItem>
            )
          })
        }
      </NavbarContent>
      <NavbarContent justify="end">
        <ThemeSwitch />
        <div className="hidden sm:flex">
          <Menu />
        </div>
        {/* <Input
          classNames={{
            base: "max-w-full sm:max-w-[10rem] h-10",
            mainWrapper: "h-full",
            input: "text-small",
            inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
          }}
          placeholder="Type to search..."
          size="sm"
          startContent={<SearchIcon size={18} />}
          type="search"
        /> */}
      </NavbarContent>
      <NavbarMenu>
        {[...NAV_DATA, ...MENU_DATA].map((item, index) => (
          <NavbarMenuItem key={`${item.path}-${index}`}>
            <Link
              className="w-full"
              href={item.path}
            >
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}