'use client'
import {formatHashLink} from '@/utils'
import { IBlock } from '@/services/notion/types'
import {Divider,Listbox, ListboxItem} from "@nextui-org/react"

const renderAnchrors = (anchors:IBlock[]) => {
    return (
      <Listbox aria-label="outline">
        {anchors.map((anchor:any) => (
          <ListboxItem key={anchor.id} textValue={anchor.rich_text[0].content}>
            <a href={`#${formatHashLink(anchor.rich_text[0].content)}`}>
              {anchor.rich_text[0].content}
            </a>
          </ListboxItem>
        ))}
      </Listbox>
    )
}

export default function Outline({content}: {content:IBlock[]}) {
  const anchors = content.filter((block:IBlock) => block.type === 'heading_2')
  if(!anchors.length) return null
  return (
    <section className='hidden md:block'>
      <div className="fixed w-full max-w-[12rem] ml-3 flex flex-col h-100vh scrollbar-hide overflow-y-scroll opacity-85">
        <div className='text-center'>Outline</div>
        <Divider className="my-2" />
        { renderAnchrors(anchors)}
      </div>
    </section>
  )
}