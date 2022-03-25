import { Gapcursor as TiptapGapcursor } from '@tiptap/extension-gapcursor'
import { meta } from './meta'

export interface GapcursorAttributes {}

export const Gapcursor = TiptapGapcursor.extend({
  name: meta.name
})
