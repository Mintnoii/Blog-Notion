'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Menu from '@/themes/nav/Menu'
import {Card, CardBody,Button} from "@nextui-org/react";
import {ITag} from '@/services/notion/types'
interface ITagsCard {
  tags: ITag[],
  onTagChange?: (tag:string) => void
}
const TagsCard = ({tags, onTagChange}:ITagsCard) => {
  const [theTagId, setTheTagId] = useState<string>('')
  // useEffect(() => onTagChange(theTagId),[theTagId])
  return (
    <Card>
      <CardBody className='flex flex-row flex-wrap p-3'>
        {[{id:'All', name:'All'}, ...tags].map(tag => {
          return (
            <Button variant="light" size='sm' key={tag.id} onClick={() => setTheTagId(tag.id)}>{`#${tag.name}`}</Button>
          )
        })}
      </CardBody>
    </Card>
  )
}
export default TagsCard