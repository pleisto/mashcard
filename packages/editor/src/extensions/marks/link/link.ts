import { Link as TiptapLink } from '@tiptap/extension-link'
import { meta } from './meta'

export type { LinkOptions } from '@tiptap/extension-link'
export interface LinkAttributes {}

export const Link = TiptapLink.extend({
  name: meta.name
}).configure({
  HTMLAttributes: {
    class: 'mashcard-link'
  }
})
