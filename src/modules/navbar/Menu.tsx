import React from "react"
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react"
import { Bars3Icon } from '@heroicons/react/24/outline'
import { MENU_DATA } from '@/constants/nav'
import { useRouter } from 'next/navigation'

export default function App() {
  const router = useRouter()
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button isIconOnly size="sm" variant="light">
          <Bars3Icon className="h-4 w-4" />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="nav menu">
        {
            MENU_DATA.map((item) => {
              return (
                <DropdownItem key={item.path} onClick={() => router.push(item.path)}>
                   {item.label}
                </DropdownItem>
              )
            })
          }
      </DropdownMenu>
    </Dropdown>
  );
}
