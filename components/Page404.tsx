import * as React from 'react'
import * as types from 'types'
import { useRouter } from 'next/router'

export const Page404: React.FC<types.PageProps> = ({ site, pageId, error }) => {
	const router = useRouter()
  return (
    <div className="flex flex-col h-screen bg-light-800 w-screen p-20px text-green-600 justify-center items-center">
      <div className="text-8xl">404</div>
      <p className='mt-20px text-lg mb-15px'>{error?.message}</p>
      <button className='bg-gray-300 rounded-8px p-10px' onClick={() => router.push('/')}>返回主页</button>
    </div>
  )
}
