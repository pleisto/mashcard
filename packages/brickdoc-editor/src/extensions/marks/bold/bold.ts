import { Bold as TiptapBold } from '@tiptap/extension-bold'
import { meta } from './meta'

export const Bold = TiptapBold.extend({
  name: meta.name
})

export type { BoldOptions } from '@tiptap/extension-bold'
export interface BoldAttributes {}
