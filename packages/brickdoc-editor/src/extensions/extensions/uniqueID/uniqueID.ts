import { findChildren } from '@tiptap/core'
import { UniqueID as TiptapUniqueID } from '@tiptap/extension-unique-id'
import { meta } from './meta'

export const UniqueID = TiptapUniqueID.extend({
  name: meta.name,

  onCreate() {
    const { state } = this.editor
    const { tr, doc } = state
    const { types, attributeName, generateID } = this.options
    const nodesWithoutId = findChildren(doc, node => {
      return types.includes(node.type.name) && node.attrs[attributeName] === null
    })

    nodesWithoutId.forEach(({ node, pos }) => {
      tr.setNodeMarkup(pos, undefined, {
        ...node.attrs,
        [attributeName]: generateID()
      })
    })

    // prevent empty document commiting when editor created
    // view.dispatch(tr)
  }
})

export type { UniqueIDOptions } from '@tiptap/extension-unique-id'
export interface UniqueIDAttributes {}
