import { PageObjectResponse,RichTextItemResponse,BlockObjectResponse,Heading1BlockObjectResponse,Heading2BlockObjectResponse,Heading3BlockObjectResponse,BulletedListItemBlockObjectResponse,NumberedListItemBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'

export interface IPageObject extends PageObjectResponse {}

export type IRichTextItem = RichTextItemResponse

// 使用交叉类型扩展 BlockObjectResponse
export type IBlockObject = BlockObjectResponse & {
  children: IBlockObject[]
}

export type IHeading = 'heading_1'|'heading_2'|'heading_3'
export type IHeadingBlock = Heading1BlockObjectResponse | Heading2BlockObjectResponse | Heading3BlockObjectResponse

export type IList = 'bulleted_list_item'|'numbered_list_item'
export type IListBlock = BulletedListItemBlockObjectResponse | NumberedListItemBlockObjectResponse