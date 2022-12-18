import { PageObjectResponse,RichTextItemResponse,BlockObjectResponse,Heading1BlockObjectResponse,Heading2BlockObjectResponse,Heading3BlockObjectResponse,BulletedListItemBlockObjectResponse,NumberedListItemBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'

export interface IPageObject extends PageObjectResponse {}

export type IBlockObjectResp  = BlockObjectResponse & {
  children: IBlockObjectResp[]
}

export type IRichTextItem = RichTextItemResponse

export type IHeading = 'heading_1'|'heading_2'|'heading_3'
export type IHeadingBlock = Heading1BlockObjectResponse | Heading2BlockObjectResponse | Heading3BlockObjectResponse

export type IList = 'bulleted_list'|'numbered_list'
export type IListItem = 'bulleted_list_item'|'numbered_list_item'
// export type IListBlock = BulletedListItemBlockObjectResponse | NumberedListItemBlockObjectResponse

export type IBlockType = IListItem | IHeading | 'paragraph' | 'quote' | 'to_do' | 'toggle' | 'unsupported' | 'child_page' | 'callout'

// export const KeyMap = {
//   'bulleted_list_item': BulletedListItemBlockObjectResponse,
// }

export interface IListBlock {
  type: IList
  has_children: boolean
  children: IBlockObject[]
}

export interface IBlockObject {
  id: string
  type: IBlockType
  has_children: boolean
  children: IBlockObject[],
  // data: IBlockObjectResp
}

export type IBlock  = IBlockObject | IListBlock