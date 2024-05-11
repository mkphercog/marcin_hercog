export type BaseTextAsType = 'h1' | 'h3' | 'p'
export type BaseTextSizeType = 'sm' | 'md' | 'lg'
export type BaseTextVatiantType = 'primary' | 'secondary'

export type BaseTextProps = {
  as?: BaseTextAsType
  size?: BaseTextSizeType
  variant?: BaseTextVatiantType
  justify?: boolean
}
