import { Underline as TiptapUnderline } from '@tiptap/extension-underline'
import { meta } from './meta'

export const Underline = TiptapUnderline.extend({
  name: meta.name
})

export type { UnderlineOptions } from '@tiptap/extension-underline'
export interface UnderlineAttributes {}
