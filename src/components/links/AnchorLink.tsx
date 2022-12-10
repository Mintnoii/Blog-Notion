import React from 'react'
import {formatHashLink} from '@/lib/transformer'

type Props = {
  children: React.ReactNode
  text: string
}

export const AnchorLink = ({ children, text }: Props) => {
  console.log(children,'children')
  return (
    <div className="flex space-x-2 group items-center justify-start">
      {children}
      <div className="opacity-10 group-hover:opacity-50">
        <a
          className="text-gray-600 dark:text-gray-400"
          id={formatHashLink(text)}
          href={`#${formatHashLink(text)}`}
        >
          <svg
            className="h-7 w-7 hidden md:block"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M16.75 13.25L18 12C19.6569 10.3431 19.6569 7.65685 18 6V6C16.3431 4.34315 13.6569 4.34315 12 6L10.75 7.25"
            ></path>
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M7.25 10.75L6 12C4.34315 13.6569 4.34315 16.3431 6 18V18C7.65685 19.6569 10.3431 19.6569 12 18L13.25 16.75"
            ></path>
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M14.25 9.75L9.75 14.25"
            ></path>
          </svg>
        </a>
      </div>
    </div>
  )
}
