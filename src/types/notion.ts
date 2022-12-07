import { PageObjectResponse,RichTextItemResponse,BlockObjectResponse,Heading1BlockObjectResponse,Heading2BlockObjectResponse,Heading3BlockObjectResponse,PartialBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'

export interface IPageObject extends PageObjectResponse {}

export type IRichTextItem = RichTextItemResponse

export type IBlockObject = BlockObjectResponse

export type IHeading = 'heading_1'|'heading_2'|'heading_3'
export type IHeadingBlock = Heading1BlockObjectResponse | Heading2BlockObjectResponse | Heading3BlockObjectResponse

