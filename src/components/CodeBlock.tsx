'use client'
import { CopyBlock, dracula } from "react-code-blocks"

type Props = {
  language: string
  rich_text: any[]
}

export const CodeBlock = ({ language, rich_text }: Props) => {
  const text = rich_text.map((item) => item.content).join('')
  const props = {
    language,
    text,
    showLineNumbers: false,
    wrapLines: true,
    theme: dracula,
    codeBlock: true,
    customStyle: {
      borderRadius: '4px',
    }
  }
  return (
    <CopyBlock {...props}/>
  )
}