'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'
import slugify from 'slugify'
import { IArticle } from '@/lib/types'
// import { handleArticleClicked } from '@/lib/handleArticleClick'
// import siteMetadata from '@/data/siteMetadata'
// import { useIsArticleRead } from '@/lib/hooks/useIsArticleRead'
// import { useRouter } from 'next/dist/client/router'
// import Link from 'next/link'
// import useSWR from 'swr'
// import cn from 'classnames'
// import readingTime from 'reading-time'
// import { FiClock } from 'react-icons/fi'
// import { Tag } from './Tag'
// import { fetcher } from 'lib/fetcher'
// import LikeButton from '@/components/features/LikeButton'
// import { Views } from 'lib/types'



type Props = {
  article: IArticle
}

export function ArticleCard({ article }: Props) {
   const router = useRouter()
  const slug = slugify(article.name).toLowerCase()
  const handleArticleClicked = (slug:string) => {
  console.log(slug,'slug', article.name)
  // const localData = JSON.parse(localStorage.getItem(slug)||'')
  // if (typeof window !== 'undefined') {
  //   localStorage.setItem(slug, JSON.stringify({ ...localData, has_read: true }))
  // }
  router.push(`/posts/函数式思维前端开发`)
}

  {/*JSON.stringify(article) */}
  return (
    <button
      className="bg-white border rounded-md mb- border-gray-100 shadow-sm my-2 text-sm w-full py-4 px-4  shadow-gray-300 dark:bg-zinc-900 dark:border-zinc-900 dark:shadow-none hover:bg-zinc-300 dark:hover:bg-zinc-800"
      onClick={() => handleArticleClicked(slug)}
    >
      <div className="flex flex-col">
        <div className="flex font-semibold text-md text-left mb-2 justify-between ">
          {article.name}
        </div>
        <div className="flex flex-row flex-wrap mb-1 gap-x-3 gap-y-1">
          {article.tags?.map((tag) => (
            <div key={tag.id} className="rounded-sm bg-zinc-200 mt-0.5 text-xs opacity-80 py-1 px-2 text-gray-700 dark:bg-zinc-700 dark:text-gray-300">
              {tag.name}
            </div>
          ))}
        </div>
        <span className="flex space-x-4 text-xs text-gray-600 justify-end dark:text-gray-400 ">
          <div>{article.last_edited_time}</div>
        </span>
      </div>
    </button>
  )
}