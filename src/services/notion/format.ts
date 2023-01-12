import * as R from 'remeda'
import { IBlockObject, IBlockObjectResp } from '@/types/notion'
import { ChildPageBlockObjectResponse, TextRichTextItemResponse, ToDoBlockObjectResponse, CalloutBlockObjectResponse, ImageBlockObjectResponse, CodeBlockObjectResponse, BookmarkBlockObjectResponse, LinkPreviewBlockObjectResponse, PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import { ITextRichText, IPageObject, IStatus, IStatusName, IProject } from '@/services/notion/types'

export function formatHashLink(link_text: string) {
  return link_text.toLowerCase().replace(/ /g, '-')
}

export const formatDate = (timestamp: string): string => {
  const date = new Date(timestamp)
  const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`
  return formattedDate
}

export const formatProject = (page: IPageObject): IProject => {
  return {
    id: page.id,
    name: (R.pathOr(page, ['properties', 'Name', 'title'], []) as ITextRichText[])?.[0]?.text?.content || '',
    cover: R.pathOr(page, ['cover', 'file', 'url'], '') as string,
    status: (page.properties.Status as IStatus).status?.name as IStatusName,
    last_edited_time: formatDate(page.last_edited_time),
  }
}

const calcRichText = (block: any) => {
  const rich_text_items = R.pathOr(block, [block.type, 'rich_text'], []) as TextRichTextItemResponse[]
  const rich_text = rich_text_items.map(item => {
    return {
      type: item.type,
      content: item.text?.content || '',
      link: item.text?.link?.url || '',
      annotations: item.annotations
    }
  })
  return { rich_text }
}
// https://developers.notion.com/reference/block
export const formatContent = (block: IBlockObjectResp) => {
  const { id, type, has_children, children } = block
  const basicData = { id, type, has_children, children }
  switch (type) {
    case 'heading_1':
    case 'heading_2':
    case 'heading_3':
    case 'bulleted_list_item':
    case 'numbered_list_item':
    case 'paragraph':
    case 'quote':
    case 'toggle':
    case 'column_list':
    case 'column':
      return {
        ...basicData,
        ...calcRichText(block)
      } as IBlockObject
    case 'to_do':
      return {
        ...basicData,
        ...calcRichText(block),
        checked: (block as ToDoBlockObjectResponse).to_do.checked
      } as IBlockObject
    case 'callout':
      return {
        ...basicData,
        ...calcRichText(block),
        icon: (block as CalloutBlockObjectResponse).callout.icon
      } as IBlockObject
    case 'child_page':
      return {
        ...basicData,
        title: (block as ChildPageBlockObjectResponse).child_page.title
      } as IBlockObject
    case 'image':
      return {
        ...basicData,
        image: (block as ImageBlockObjectResponse).image,
        caption: (block as ImageBlockObjectResponse).image.caption
      } as IBlockObject
    case 'code':
      return {
        ...basicData,
        ...calcRichText(block),
        language: (block as CodeBlockObjectResponse).code.language
      } as IBlockObject
    case 'bookmark':
      return {
        ...basicData,
        caption: (block as BookmarkBlockObjectResponse).bookmark.caption,
        url: (block as BookmarkBlockObjectResponse).bookmark.url,
      }
    case 'link_preview':
      return {
        ...basicData,
        url: (block as LinkPreviewBlockObjectResponse).link_preview.url,
      }
    default:
      return block as IBlockObject
  }
}
