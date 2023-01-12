'use client'
import {formatHashLink} from '@/utils'
import { IBlock } from '@/services/notion/types'
import {Divider,Listbox, ListboxItem} from "@nextui-org/react"

const renderAnchrors = (anchors:IBlock[]) => {
  if(anchors.length) {
    return (
      <Listbox>
        {anchors.map((anchor:any) => (
          <ListboxItem  key={anchor.id}>
            <a
          href={`#${formatHashLink(anchor.rich_text[0].content)}`}
        >{
          anchor.rich_text[0].content
        }</a>
          </ListboxItem>
        ))}
      </Listbox>
    )
  }else{
    return (
      <div className="text-gray-600 dark:text-gray-400 text-sm py-2">
        This article has no outline.
      </div>
    )
  }
}

export default function Outline({content}: {content:IBlock[]}) {
  const anchors = content.filter((block:IBlock) => block.type === 'heading_2')
  return (
    <section className='hidden md:block'>
      <div className="fixed w-full max-w-[12rem] flex flex-col h-100vh scrollbar-hide overflow-y-scroll">
        <div className='text-center font-bold'>Outline</div>
        <Divider className="my-2" />
        { renderAnchrors(anchors)}
      </div>
    </section>
  )
}