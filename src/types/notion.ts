import { PageObjectResponse,RichTextItemResponse,BlockObjectResponse,Heading1BlockObjectResponse,Heading2BlockObjectResponse,Heading3BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'

export interface IPageObject extends PageObjectResponse {}

export type IRichTextItem = RichTextItemResponse

export type IBlockObject = BlockObjectResponse


export type IHeadingBlockObject = Heading1BlockObjectResponse | Heading2BlockObjectResponse | Heading3BlockObjectResponse

