import React from "react"
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react"
import { Bars3Icon } from '@heroicons/react/24/outline'

export default function App() {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button isIconOnly size="sm" className="bg-zinc-300 transition ease-in-out ring-neutral-400 duration-200 dark:bg-zinc-700 hover:bg-zinc-300 hover:ring-2 dark:hover:bg-zinc-800">
          <Bars3Icon className="h-4 w-4" />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem key="new">New file</DropdownItem>
        <DropdownItem key="copy">Copy link</DropdownItem>
        <DropdownItem key="edit">Edit file</DropdownItem>
        <DropdownItem key="delete" className="text-danger" color="danger">
          Delete file
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
