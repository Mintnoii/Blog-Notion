'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import classnames from 'classnames'
import { Card, CardBody, Button,Link } from "@nextui-org/react";
import { ITag, IBlog } from '@/services/notion/types'

interface IBlogPanel {
  blogs: IBlog[],
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
const BlogPanel = ({ blogs, tags }: IBlogPanel) => {
  const [tagName, setTagName] = useState('All')

  const tagFilter = (blogs: IBlog[]) => blogs.filter(i => tagName === 'All' || i.tags?.some(tag => tag.name === tagName))
  const filteredBlogs = tagFilter(blogs)
  // .sort((a, b) => Number(new Date(b.create_time)))
  // .filter((blog) => {
  //   return (
  //     blog.title.toLowerCase().includes(searchValue.toLowerCase())
  //   )
  // })
  const router = useRouter()

  const openBlog = (blogId: string) => router.push(`/blog/${blogId}`)

  return (
    <div className='w-full'>
      <section>
        <TagsCard tagName={tagName} tags={tags} setTagName={setTagName} />
      </section>
      <section className='flex flex-col mt-4'>
        {filteredBlogs.map((blog) => (
          <Card key={blog.id} isHoverable={true} shadow={'sm'} className='my-2'>
            <CardBody className='flex-col flex'>
                <Link {...{underline:'hover'}} className="flex font-semibold text-md text-left mb-2 justify-between cursor-pointer text-black dark:text-gray-300" onClick={() => openBlog(blog.id)}>
                  {blog.name}
                </Link>
              <div className="flex flex-row flex-wrap mb-1 gap-x-3 gap-y-1">
                {blog.tags?.map(({ name }) => {
                  return (
                    <div key={name} className="rounded-sm bg-zinc-200 mt-0.5 text-xs opacity-80 py-1 px-2 text-gray-700 dark:bg-zinc-700 dark:text-gray-300">
                      {name}
                    </div>
                  )
                })}
              </div>
              <span className="flex space-x-4 text-xs text-gray-600 justify-end dark:text-gray-400 ">
                <div>{blog.last_edited_time}</div>
              </span>
            </CardBody>
          </Card>
        ))}
      </section>
    </div>
  )
}
export default BlogPanel