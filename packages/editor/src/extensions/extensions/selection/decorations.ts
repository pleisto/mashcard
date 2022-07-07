import { Editor } from '@tiptap/core'
import { EditorState, TextSelection } from 'prosemirror-state'
import { Decoration, DecorationSet } from 'prosemirror-view'
import { SelectionOptions } from './meta'
import { MultipleNodeSelection } from './MultipleNodeSelection'

const DEFAULT_TEXT_SELECTION_CLASS = 'text-selection-highlight'
const DEFAULT_NODE_SELECTION_CLASS = 'node-selection-highlight'

export function textSelectionDecoration(
  editor: Editor,
  options: SelectionOptions,
  state: EditorState
): DecorationSet | null {
  if (!editor.isEditable) return null

  if (!(state.selection instanceof TextSelection)) return null

  const { from, to } = state.selection
  if (state.selection.empty) return null

  const decorations: Decoration[] = []

  const inlineDecoration = Decoration.inline(from, to, {
    class: options.textSelection?.className ?? DEFAULT_TEXT_SELECTION_CLASS,
    style: options.textSelection?.style
  })
  decorations.push(inlineDecoration)

  return DecorationSet.create(editor.state.doc, decorations)
}

// TODO: highlight Node Selection correctly
// need a solution to distinguish whether add a decoration to Node Selection or not.
export function nodeSelectionDecoration(
  editor: Editor,
  options: SelectionOptions,
  state: EditorState
): DecorationSet | null {
  if (!editor.isEditable) return null
  if (!(state.selection instanceof MultipleNodeSelection)) return null

  const decorations: Decoration[] = []

  state.selection.ranges.forEach(range => {
    const nodeDecoration = Decoration.node(range.$from.pos, range.$to.pos, {
      class: options.nodeSelection?.className ?? DEFAULT_NODE_SELECTION_CLASS,
      style: options.nodeSelection?.style
    })
    decorations.push(nodeDecoration)
  })

  return DecorationSet.create(state.doc, decorations)
}
