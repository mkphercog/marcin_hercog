type LinkType = {
  as?: 'link'
  link: string
}

export type TextAs = 'mainHeader' | 'header' | 'text' | 'smallText'

type OtherTypes = {
  as?: TextAs
  link?: never
}

export type BaseTextVatiantType = 'primary' | 'secondary'

export type BaseTextProps = {
  variant?: BaseTextVatiantType
  justify?: boolean
} & (LinkType | OtherTypes)
