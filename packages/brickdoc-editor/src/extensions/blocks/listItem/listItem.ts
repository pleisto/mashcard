import { ListItem as TiptapListItem } from '@tiptap/extension-list-item'
import { meta } from './meta'

export type { ListItemOptions } from '@tiptap/extension-list-item'
export interface ListItemAttributes {}

export const ListItem = TiptapListItem.extend({
  name: meta.name
})
