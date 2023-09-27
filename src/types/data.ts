export interface IBlog {
  id: string
  name: string
  cover_image: string
  last_edited_time?: string
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