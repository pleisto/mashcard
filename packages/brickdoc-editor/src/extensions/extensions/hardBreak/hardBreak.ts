import { HardBreak as TiptapHardBreak } from '@tiptap/extension-hard-break'
import { meta } from './meta'

export const HardBreak = TiptapHardBreak.extend({
  name: meta.name
})

export type { HardBreakOptions } from '@tiptap/extension-hard-break'
export interface HardBreakAttributes {}
