import { Link as TiptapLink } from '@tiptap/extension-link'

export type { LinkOptions } from '@tiptap/extension-link'
export interface LinkAttributes {}

export const Link = TiptapLink.configure({
  HTMLAttributes: {
    class: 'brickdoc-link'
  }
})
