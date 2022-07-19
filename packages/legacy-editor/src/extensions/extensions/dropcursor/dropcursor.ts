import { Dropcursor as TiptapDropcursor } from '@tiptap/extension-dropcursor'
import { meta } from './meta'

export type { DropcursorOptions } from '@tiptap/extension-dropcursor'
export interface DropcursorAttributes {}

export const Dropcursor = TiptapDropcursor.extend({
  name: meta.name
})
