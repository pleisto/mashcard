import { Code as TiptapCode } from '@tiptap/extension-code'
import { meta } from './meta'

export const Code = TiptapCode.extend({
  name: meta.name
})

export type { CodeOptions } from '@tiptap/extension-code'
export interface CodeAttributes {}
