import { BlockViewProps, ExtensionMeta } from '../../common'

export const meta: ExtensionMeta = {
  name: 'pageLinkBlock',
  extensionType: 'block'
}

export interface PageLinkOptions {
  size?: 'sm' | 'md'
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
