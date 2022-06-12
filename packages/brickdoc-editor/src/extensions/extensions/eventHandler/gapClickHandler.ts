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

  // when clicked at the end of document, the latest two position will be null
  const node = view.state.doc.nodeAt(position - 2)
  const nextNode = view.state.doc.nodeAt(position)

  if (!nextNode) {
    if (node && paragraphLikeBlockType.includes(node.type.name)) return
    insertNewLine(editor, position)
  }
}
