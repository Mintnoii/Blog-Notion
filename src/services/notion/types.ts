import {IBlock as NKIBlock, IBlockObject,StatusPropertyItemObjectResponse} from "@tachikomas/notion-kit"

export type IBlockObjectResp = IBlockObject & {
  children: IBlockObjectResp[]
}

export interface IBlock extends NKIBlock{
  children: IBlock[],
}

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
  cover_url?: string
}
export interface ITag {
  id: string
  name: string
  color: string
}