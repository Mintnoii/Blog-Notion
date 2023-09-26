'use client'
import classnames from 'classnames'
import {Code, Link} from "@nextui-org/react"

interface TextProps {
  rich_text: any
  showAnchorIcon?: boolean
}
export const Text = ({rich_text, showAnchorIcon=true}:TextProps) => {
  if (!rich_text) {
    return null
  }
  return rich_text.map((value:any,index:number) => {
    const {
      annotations: { bold, code, color, italic, strikethrough, underline },
      link,
      content,
    } = value
    if (code) {
      return (<Code className='px-1.5 py-0.5' key={index}>{content}</Code>)
    }
    return (
      <span
        key={index}
        className={
          classnames(
            'text-sm whitespace-pre-line leading-[26px]',
            {
              'font-bold': bold,
              'italic': italic,
              'line-through': strikethrough,
              'underline': underline,
              'mx-1 inline-block rounded-md bg-slate-400 px-1 py-0.5 align-middle tracking-tight text-green-500 dark:bg-cyan-800 dark:bg-opacity-50 dark:text-indigo-200': code,
            }
          )}
        style={color !== 'default' ? { color } : {}}
      >
       {link ?  <Link className='text-sm' isExternal showAnchorIcon={showAnchorIcon} href={link}>
        {content}
      </Link> : content}
        {/* {link ? <a href={link}>{content}</a> : content} */}
      </span>
    )
  })
}

export default Text