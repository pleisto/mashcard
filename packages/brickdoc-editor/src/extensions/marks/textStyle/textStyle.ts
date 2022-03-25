import { TextStyle as TiptapTextStyle } from '@tiptap/extension-text-style'
import { meta } from './meta'

export const TextStyle = TiptapTextStyle.extend({
  name: meta.name
})

export type { TextStyleOptions } from '@tiptap/extension-text-style'
export interface TextStyleAttributes {}
