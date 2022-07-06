import { Editor } from '@tiptap/core'
import { ResolvedPos } from 'prosemirror-model'
import { TextSelection, Selection } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'
import { findNodesInSelection } from '../../../helpers'
import { SelectionPluginKey } from './selection'

export function normalizeSelection(
  editor: Editor,
  view: EditorView,
  $anchor: ResolvedPos,
  $head: ResolvedPos
): Selection | null {
  if (!editor.isEditable) return null

  const pluginState = SelectionPluginKey.getState(view.state)

  if (pluginState?.multiNodeSelecting && pluginState.multiNodeSelecting.selecting) return view.state.selection

  if ($anchor.pos === $head.pos) return null
  if (!(view.state.selection instanceof TextSelection)) return null

  // remove non-text node and empty text node selection by check: to - from > 1
  // because we don't want non-text nodes at the end of Text Selection
  // due to window.getSelection() will automatically select the nearest text if end of the selection is not a text node
  const nodeRanges = findNodesInSelection(editor, $anchor.pos, $head.pos).filter(range => range.to - range.from > 1)
  if (nodeRanges.length > 0) {
    const to = nodeRanges[nodeRanges.length - 1].to
    return TextSelection.create(view.state.doc, $anchor.pos, to)
  }

  return null
}
