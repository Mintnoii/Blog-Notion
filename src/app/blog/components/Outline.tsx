'use client'
import {Divider} from "@nextui-org/react"

export default function Outline() {
  return (
     <section className='hidden md:block'>
      <div className="fixed w-full max-w-[12rem] flex flex-col h-100vh scrollbar-hide overflow-y-scroll">
        <div className='text-center font-bold'>outline</div>
        <Divider className="my-2" />
      </div>
     </section>
  )
}