import { Link, LinkOptions as TiptapLinkOptions } from '@tiptap/extension-link'
import { ExtensionMeta } from '../../common'

export interface LinkPage {
  id: string
  parentId?: string | null
  title: string
  path?: string
  icon?: string | null
  href: string
}

export interface LinkOptions extends Partial<TiptapLinkOptions> {
  pages?: LinkPage[]
  onNavigate?: (href: string) => void
}

export interface LinkAttributes {
  href?: string
  target?: string
  pageId?: string
  type: 'page' | 'link'
}

export const meta: ExtensionMeta = {
  name: Link.name,
  extensionType: 'mark'
}
