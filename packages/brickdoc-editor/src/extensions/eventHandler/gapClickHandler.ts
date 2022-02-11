import { Editor } from '@tiptap/core'
import Paragraph from '@tiptap/extension-paragraph'
import { EditorView } from 'prosemirror-view'
import { unselectableBlockType, paragraphLikeBlockType } from '../../helpers/block'

const insertNewLine = (editor: Editor, position: number): void => {
  editor.chain().insertContentAt(position, { type: Paragraph.name }).run()
}

export const gapClickHandler = (editor: Editor, view: EditorView, position: number, event: MouseEvent): void => {
  if (!(event.target as HTMLElement)?.classList.contains('ProseMirror')) {
    return
  }

  if (position - 1 < 0) return
  const node = view.state.doc.nodeAt(position - 1)

  if (!node) return

  if (!unselectableBlockType.includes(node?.type.name)) return

  const nextNode = view.state.doc.nodeAt(position)
  if (nextNode && paragraphLikeBlockType.includes(nextNode.type.name)) return

  insertNewLine(editor, position)
}
