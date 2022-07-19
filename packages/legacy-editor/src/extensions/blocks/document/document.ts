import { Document as TiptapDocument } from '@tiptap/extension-document'
import { meta } from './meta'

export const Document = TiptapDocument.extend({
  name: meta.name
})
