import Heading, { HeadingOptions } from '@tiptap/extension-heading'
import { BlockViewProps, ExtensionMeta } from '../../common'

export const meta: ExtensionMeta = {
  name: Heading.name,
  extensionType: 'block'
}

export type { HeadingOptions } from '@tiptap/extension-heading'
export interface HeadingAttributes {
  level: 1 | 2 | 3 | 4 | 5 | 6
}
export interface HeadingViewProps extends BlockViewProps<HeadingOptions, HeadingAttributes> {}
