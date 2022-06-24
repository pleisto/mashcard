import { Editor } from '@tiptap/core'
import { Plugin, PluginKey, EditorState, TextSelection } from 'prosemirror-state'
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

interface SelectionState {}

export const SelectionPluginKey = new PluginKey(meta.name)

export const Selection = createExtension<SelectionOptions, SelectAttributes>({
  name: meta.name,

  addProseMirrorPlugins() {
    return [
      new Plugin<SelectionState>({
        key: SelectionPluginKey,
        props: {
          decorations: (state: EditorState) => {
            const { from, to } = state.selection
            const decorations: Decoration[] = []

            if (!this.editor.isEditable || from === to) return

            const inlineDecoration = Decoration.inline(from, to, {
              class: this.options.HTMLAttributes?.class ?? DEFAULT_SELECTION_CLASS,
              style: this.options.HTMLAttributes?.style
            })
            decorations.push(inlineDecoration)

            return DecorationSet.create(this.editor.state.doc, decorations)
          },
          createSelectionBetween: (view, $anchor, $head) => {
            if (!this.editor.isEditable || $anchor.pos === $head.pos) return

            // remove non-text node and empty text node selection by check: to - from > 1
            // because we don't want non-text nodes at the end of Text Selection
            // due to window.getSelection() will automatically select the nearest text if end of the selection is not a text node
            const nodeRanges = findNodesInSelection(this.editor, $anchor.pos, $head.pos).filter(
              range => range.to - range.from > 1
            )

            if (nodeRanges.length > 0) {
              const to = nodeRanges[nodeRanges.length - 1].to
              return TextSelection.create(this.editor.state.doc, $anchor.pos, to)
            }
          }
        }
      })
    ]
  }
})
