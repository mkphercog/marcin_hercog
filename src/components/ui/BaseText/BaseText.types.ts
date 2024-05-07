type LinkType = {
  as?: 'link'
  link: string
}

type OtherTypes = {
  as?: 'mainHeader' | 'header' | 'text' | 'smallText'
  link?: never
}

export type BaseTextVatiantType = 'primary' | 'secondary'

export type BaseTextProps = {
  variant?: BaseTextVatiantType
  justify?: boolean
} & (LinkType | OtherTypes)
