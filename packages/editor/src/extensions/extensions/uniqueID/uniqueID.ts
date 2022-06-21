import { UniqueID as TiptapUniqueID } from '@tiptap/extension-unique-id'
import { meta } from './meta'

export const UniqueID = TiptapUniqueID.extend({
  name: meta.name,

  onCreate() {
    // prevent empty document commiting when editor created
  }
})

export type { UniqueIDOptions } from '@tiptap/extension-unique-id'
export interface UniqueIDAttributes {}
