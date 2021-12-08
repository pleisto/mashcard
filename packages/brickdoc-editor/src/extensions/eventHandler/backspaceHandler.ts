import { Editor } from '@tiptap/core'
import { EditorView } from 'prosemirror-view'

const excludeNodes = ['imageSection', 'linkBlock', 'pdfSection', 'tableBlock']
const paragraphLikeNodes = ['paragraph', 'heading']

export function backspaceHandler(editor: Editor, view: EditorView, event: KeyboardEvent): boolean {
  let position = view.state.selection.from
  let node = view.state.doc.nodeAt(position)
  let isEmptyLine = false
  let emptyLineFrom = -1

  if (!node) {
    // get the previous node
    position = Math.max(position - 1, 0)
    node = view.state.doc.nodeAt(position)
  }

  // at the start position of a paragraph like node
  if (node && paragraphLikeNodes.includes(node.type.name) && !node.text) {
    emptyLineFrom = position
    isEmptyLine = true
    // get the previous node
    position = Math.max(position - 1, 0)
    node = view.state.doc.nodeAt(position)
  }

  if (!node) return false

  if (!excludeNodes.includes(node.type.name)) return false

  // delete empty line
  if (isEmptyLine)
    editor
      .chain()
      .deleteRange({ from: emptyLineFrom, to: emptyLineFrom + 1 })
      .focus()
      .scrollIntoView()
      .run()

  return true
}
