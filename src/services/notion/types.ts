import { PageObjectResponse, RichTextItemResponse, BlockObjectResponse, Heading1BlockObjectResponse, Heading2BlockObjectResponse, Heading3BlockObjectResponse, TextRichTextItemResponse, StatusPropertyItemObjectResponse } from '@notionhq/client/build/src/api-endpoints'

export interface IPageObject extends PageObjectResponse { }

export type IRichTextItem = RichTextItemResponse
export type ITextRichText = TextRichTextItemResponse


export interface IDataItem {
  id: string
  name: string
  cover: string
  last_edited_time: string
}

export interface IBlog extends IDataItem {
  tags?: any[]
}

export type IStatus = StatusPropertyItemObjectResponse
export type IStatusName = 'In Progress' | 'Done'
export interface IProject extends IDataItem {
  icon?: string
  status?: IStatusName
  intro?: string
  github?: string
}

export type IBlockObjectResp = BlockObjectResponse & {
  children: IBlockObjectResp[]
}


export type IHeading = 'heading_1' | 'heading_2' | 'heading_3'
export type IHeadingBlock = Heading1BlockObjectResponse | Heading2BlockObjectResponse | Heading3BlockObjectResponse

export type IList = 'bulleted_list' | 'numbered_list'
export type IListItem = 'bulleted_list_item' | 'numbered_list_item'
// export type IListBlock = BulletedListItemBlockObjectResponse | NumberedListItemBlockObjectResponse

export type IBlockType = BlockObjectResponse['type']

// export const KeyMap = {
//   'bulleted_list_item': BulletedListItemBlockObjectResponse,
// }

export interface IListBlock {
  type: IList
  has_children: boolean
  children: IBlockObject[]
  id?: string
}

export interface IBlockObject {
  id: string
  type: IBlockType
  has_children: boolean
  children: IBlockObject[],
  // data: IBlockObjectResp
}

export type IBlock = IBlockObject | IListBlock

export interface IContentBlock {
  id: string
  // todo add more types
  type: string
  href: string | null
  text?: string
  color?: string

}

export interface ITag {
  id: string
  name: string
  color: string
}