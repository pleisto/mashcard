import OrderedList from '@tiptap/extension-ordered-list'
import { ExtensionMeta } from '../../common'

export const meta: ExtensionMeta = {
  name: OrderedList.name,
  extensionType: 'block'
}

export type { OrderedListOptions } from '@tiptap/extension-ordered-list'
export interface OrderedListAttributes {}
