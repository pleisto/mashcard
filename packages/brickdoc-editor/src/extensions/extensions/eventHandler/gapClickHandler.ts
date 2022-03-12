import { Editor } from '@tiptap/core'
import Paragraph from '@tiptap/extension-paragraph'
import { EditorView } from 'prosemirror-view'
import { paragraphLikeBlockType } from '../../../helpers/block'

const insertNewLine = (editor: Editor, position: number): void => {
  editor.chain().insertContentAt(position, { type: Paragraph.name }).run()
}

export const gapClickHandler = (editor: Editor, view: EditorView, position: number, event: MouseEvent): void => {
  if (!(event.target as HTMLElement)?.classList.contains('ProseMirror')) {
    return
  }

  if (position - 1 < 0) return

  let node = view.state.doc.nodeAt(position - 1)
  if (node && paragraphLikeBlockType.includes(node.type.name)) return

  const nextNode = view.state.doc.nodeAt(position)
  if (nextNode && paragraphLikeBlockType.includes(nextNode.type.name)) return

  // when clicked at the end of document, the latest two position will be null
  if (!node && !nextNode) {
    node = view.state.doc.nodeAt(position - 2)
    if (node && paragraphLikeBlockType.includes(node.type.name)) return
  }

  insertNewLine(editor, position)
}
