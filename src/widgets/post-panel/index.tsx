'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import classnames from 'classnames'
import { Card, CardBody, Button,Link } from "@nextui-org/react";
import { ITag, IPost } from '@/services/notion/types'

interface IBlogPanel {
  posts: IPost[],
  tags: ITag[],
}
interface ITagsCard {
  tagName: string
  tags: ITag[],
  setTagName: (tag: string) => void
}
const TagsCard = ({ tagName, tags, setTagName }: ITagsCard) => {
  return (
    <Card shadow={'sm'}>
      <CardBody className='flex flex-row flex-wrap p-3'>
        {[{ id: 'All', name: 'All' }, ...tags].map(({ name }) => {
          return (
            <Button variant="light" size='sm' key={name} onClick={() => setTagName(name)}>
              <span className={classnames({ 'text-green-500': tagName === name })}>#</span>
              <span>{name}</span>
            </Button>
          )
        })}
      </CardBody>
    </Card>
  )
}
const BlogPanel = ({ posts, tags }: IBlogPanel) => {
  const [tagName, setTagName] = useState('All')

  const tagFilter = (posts: IPost[]) => posts.filter(i => tagName === 'All' || i.tags?.some(tag => tag.name === tagName))
  const filteredBlogs = tagFilter(posts)
  // .sort((a, b) => Number(new Date(b.create_time)))
  // .filter((post) => {
  //   return (
  //     post.title.toLowerCase().includes(searchValue.toLowerCase())
  //   )
  // })
  const router = useRouter()

  const openBlog = (blogId: string) => router.push(`/post/${blogId}`)

  return (
    <div className='w-full'>
      <section>
        <TagsCard tagName={tagName} tags={tags} setTagName={setTagName} />
      </section>
      <section className='flex flex-col mt-4'>
        {filteredBlogs.map((post) => (
          <Card key={post.id} isHoverable={true} shadow={'sm'} className='my-2'>
            <CardBody className='flex-col flex'>
                <Link {...{underline:'hover'}} className="flex font-semibold text-md text-left mb-2 justify-between cursor-pointer text-black dark:text-gray-300" onClick={() => openBlog(post.id)}>
                  {post.name}
                </Link>
              <div className="flex flex-row flex-wrap mb-1 gap-x-3 gap-y-1">
                {post.tags?.map(({ name }) => {
                  return (
                    <div key={name} className="rounded-sm bg-zinc-200 mt-0.5 text-xs opacity-80 py-1 px-2 text-gray-700 dark:bg-zinc-700 dark:text-gray-300">
                      {name}
                    </div>
                  )
                })}
              </div>
              <span className="flex space-x-4 text-xs text-gray-600 justify-end dark:text-gray-400 ">
                <div>{post.last_edited_time}</div>
              </span>
            </CardBody>
          </Card>
        ))}
      </section>
    </div>
  )
}
export default BlogPanel