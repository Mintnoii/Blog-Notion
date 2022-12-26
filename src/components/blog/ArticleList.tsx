import { IArticle } from '@/types/data'
import { ArticleCard } from '@/components/blog/ArticleCard'

type Props = {
  articles: IArticle[]
}
const ArticleList = ({ articles }:Props) => {
  if (!articles || !articles.length) return null
  return (
    <div className="">
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  )
}

export default ArticleList