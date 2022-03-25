import { Blockquote as TiptapBlockquote } from '@tiptap/extension-blockquote'
import { meta } from './meta'

export type { BlockquoteOptions } from '@tiptap/extension-blockquote'

export interface BlockquoteAttributes {}

export const Blockquote = TiptapBlockquote.extend({
  name: meta.name
})
