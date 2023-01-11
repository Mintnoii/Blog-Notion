export interface IDataItem {
  id: string
  name: string
  cover_image: string
  last_edited_time: string
}

export interface IBlog extends IDataItem {
  tags?: any[]
}

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