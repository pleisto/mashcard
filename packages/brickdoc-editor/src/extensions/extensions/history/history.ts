import { History as TiptapHistory } from '@tiptap/extension-history'
import { meta } from './meta'

export const History = TiptapHistory.extend({
  name: meta.name
})

export type { HistoryOptions } from '@tiptap/extension-history'
export interface HistoryAttributes {}
