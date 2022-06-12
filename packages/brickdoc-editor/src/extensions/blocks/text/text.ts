import { Text as TiptapText } from '@tiptap/extension-text'
import { meta } from './meta'

export interface TextAttributes {}

export const Text = TiptapText.extend({
  name: meta.name
})
