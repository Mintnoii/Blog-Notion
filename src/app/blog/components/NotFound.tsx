import React from 'react'

const NotFound = (children:React.ReactNode) => {

  return (
    <div className="">
      <p className="">
        {children}
        <span>
          <svg className="h-7 ml-3 w-7" fill="none" viewBox="0 0 24 24">
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M8.75 4.75H15.25C17.4591 4.75 19.25 6.54086 19.25 8.75V15.25C19.25 17.4591 17.4591 19.25 15.25 19.25H8.75C6.54086 19.25 4.75 17.4591 4.75 15.25V8.75C4.75 6.54086 6.54086 4.75 8.75 4.75Z"
            ></path>
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M7.75 15.25C7.75 15.25 9 12.75 12 12.75C15 12.75 16.25 15.25 16.25 15.25"
            ></path>
            <circle cx="14" cy="10" r="1" fill="currentColor"></circle>
            <circle cx="10" cy="10" r="1" fill="currentColor"></circle>
          </svg>
        </span>
      </p>
    </div>
  )
}

export default NotFound
