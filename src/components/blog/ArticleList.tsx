import { IArticle } from '@/types/data'
import { ArticleCard } from '@/components/blog/ArticleCard'

type Props = {
  articles: IArticle[]
}

export function ArticleList({ articles }:Props) {
  return (
    <div className="">
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  )
}