import ListItem from '@tiptap/extension-list-item'
import { ExtensionMeta } from '../../common'

export const meta: ExtensionMeta = {
  name: ListItem.name,
  extensionType: 'block'
}

export type { ListItemOptions } from '@tiptap/extension-list-item'
export interface ListItemAttributes {}
