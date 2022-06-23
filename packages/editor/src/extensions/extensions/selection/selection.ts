import { Editor } from '@tiptap/core'
import { Plugin, EditorState } from 'prosemirror-state'
import { Decoration, DecorationSet } from 'prosemirror-view'
import { findNodesInSelection } from '../../../helpers'
import { createExtension } from '../../common'
import { meta, SelectAttributes, SelectionOptions } from './meta'
import { meta as paragraphMeta } from '../../blocks/paragraph/meta'
import { meta as headingMeta } from '../../blocks/heading/meta'
import { meta as listItemMeta } from '../../blocks/listItem/meta'
import { meta as orderedListMeta } from '../../blocks/orderedList/meta'
import { meta as bulletListMeta } from '../../blocks/bulletList/meta'
import { meta as taskItemMeta } from '../../blocks/taskItem/meta'
import { meta as taskListMeta } from '../../blocks/taskList/meta'
import { meta as calloutMeta } from '../../blocks/callout/meta'
import { meta as blockquoteMeta } from '../../blocks/blockquote/meta'

const allowedNodeTypes = [
  paragraphMeta.name,
  headingMeta.name,
  listItemMeta.name,
  orderedListMeta.name,
  bulletListMeta.name,
  taskItemMeta.name,
  taskListMeta.name,
  calloutMeta.name,
  blockquoteMeta.name
]

export const isTextContentSelected = ({ editor, from, to }: { editor: Editor; from: number; to: number }): boolean => {
  if (!editor.isEditable || editor.isDestroyed) return false
  if (from === to) return false

  let show = false

  const nodes = findNodesInSelection(editor, from, to)

  let length = 0

  for (const { node } of nodes) {
    if (node) {
      // Text node
      if (node.type.name === 'text') {
        length += node.text?.length ?? 0
        show = true
      } else if (allowedNodeTypes.includes(node.type.name)) {
        length += node.textContent?.length ?? 0
        show = true
      } else {
        return false
      }
    }
  }

  return show && length > 0
}

export const DEFAULT_SELECTION_CLASS = 'editor-selection'

export const Selection = createExtension<SelectionOptions, SelectAttributes>({
  name: meta.name,

  addOptions() {
    return {
      className: DEFAULT_SELECTION_CLASS
    }
  },

  addProseMirrorPlugins() {
    return [
      new Plugin({
        props: {
          decorations: (state: EditorState) => {
            const editor = this.editor
            const { from, to } = state.selection
            const decorations: Decoration[] = []
            if (!isTextContentSelected({ editor, from, to })) return

            const decoration = Decoration.inline(from, to, {
              class: this.options.className
            })

            decorations.push(decoration)

            return DecorationSet.create(editor.state.doc, decorations)
          }
        }
      })
    ]
  }
})
