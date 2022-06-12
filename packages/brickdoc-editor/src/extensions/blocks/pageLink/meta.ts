import { BlockViewProps, ExtensionMeta } from '../../common'

export const meta: ExtensionMeta = {
  name: 'pageLinkBlock',
  extensionType: 'block'
}

export interface PageData {
  id: string
  parentId: string | null | undefined
  icon: string | undefined | null
  title: string | undefined | null
  link: string | undefined | null
}

export interface PageLinkOptions {
  size?: 'sm' | 'md'
  pages?: PageData[]
}

export interface PageLinkAttributes {
  page: {
    type: 'PAGE'
    title?: string
    icon?: string
    key: string
    link?: string
  }
}

export interface PageLinkViewProps extends BlockViewProps<PageLinkOptions, PageLinkAttributes> {}
