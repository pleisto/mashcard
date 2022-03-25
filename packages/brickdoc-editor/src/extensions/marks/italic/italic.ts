import { Italic as TiptapItalic } from '@tiptap/extension-italic'
import { meta } from './meta'

export const Italic = TiptapItalic.extend({
  name: meta.name
})

export type { ItalicOptions } from '@tiptap/extension-italic'
export interface ItalicAttributes {}
