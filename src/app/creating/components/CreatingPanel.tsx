'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
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
      <section className='flex flex-col mt-4'>
        {filteredBlogs.map((blog) => (
          <Card key={blog.id} isHoverable={true} className='my-2'>
            <CardBody className='flex-col flex'>
                <Link {...{underline:'hover'}} className="flex font-semibold text-md text-left mb-2 justify-between cursor-pointer text-black dark:text-gray-300" onClick={() => openBlog(blog.id)}>
                  {blog.name}
                </Link>
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