import { IArticle } from '@/lib/types'
import Image from 'next/image'
// import { handleArticleClicked } from '@/lib/handleArticleClick'
// import siteMetadata from '@/data/siteMetadata'
import slugify from 'slugify'
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
  // const router = useRouter()
  // const slug = slugify(article.name).toLowerCase()
  // const { data } = useSWR<Views>(`/api/views/${slug}`, fetcher)
  // const views = data?.total
  //  onClick={() => handleArticleClicked(slug)}
  return (
    <button
      className="bg-white border rounded-md mb- border-gray-100 shadow-sm my-2 text-sm w-full py-4 px-4  shadow-gray-300 dark:bg-zinc-900 dark:border-zinc-900 dark:shadow-none hover:bg-zinc-300 dark:hover:bg-zinc-800"
     
    >
      <div className="flex flex-col">
        <div className="flex font-semibold text-md text-left mb-2 justify-between ">
          {article.name}
        </div>

        {/*JSON.stringify(article) */}
        {/* <div className="flex flex-row flex-wrap mb-1 gap-x-3 gap-y-1">
          {article.tags?.map((tag) => (
            // eslint-disable-next-line react/jsx-key
            <div className="rounded-sm bg-zinc-200 mt-0.5 text-xs opacity-80 px-3 text-gray-700 dark:bg-zinc-700 dark:text-gray-300">
              {tag}
            </div>
          ))}
        </div> */}
        <span className="flex space-x-4 text-xs text-gray-600 justify-end dark:text-gray-400 ">
          <div>{article.last_edited_time}</div>
          {/* <div>
            {new Date(article.publishedDate).toLocaleDateString('de-AT', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            })}{' '}
          </div> */}
        </span>
      </div>
    </button>
  )
}