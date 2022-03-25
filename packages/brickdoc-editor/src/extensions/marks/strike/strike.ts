import { Strike as TiptapStrike } from '@tiptap/extension-strike'
import { meta } from './meta'

export const Strike = TiptapStrike.extend({
  name: meta.name
})

export type { StrikeOptions } from '@tiptap/extension-strike'
export interface StrikeAttributes {}
