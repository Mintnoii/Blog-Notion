'use client'
import { IArticle } from '@/types/data'
import Link from 'next/link'

type Props = {
  article: IArticle
}

export default function BlogCard({ article }: Props) {

  return (
     <Link key={article.id} href={`/blog/${article.id}`}>
      <button
        className="bg-white rounded-md shadow-sm my-2 text-sm w-full py-4 px-4  shadow-gray-300 dark:bg-zinc-900 dark:border-zinc-900 dark:shadow-none hover:bg-zinc-300 dark:hover:bg-zinc-800"
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
     </Link>
  )
}