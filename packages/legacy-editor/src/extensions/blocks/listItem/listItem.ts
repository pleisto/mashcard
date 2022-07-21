import { ListItem as TiptapListItem } from '@tiptap/extension-list-item'
import { meta } from './meta'

export const ListItem = TiptapListItem.extend({
  name: meta.name,
  content: 'paragraph list*'
})
