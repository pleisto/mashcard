import { Editor } from '@tiptap/core'
import Paragraph from '@tiptap/extension-paragraph'
import { EditorView } from 'prosemirror-view'
import { meta as paragraphMeta } from '../../blocks/paragraph/meta'
import { meta as headingMeta } from '../../blocks/heading/meta'

const paragraphLikeBlockType = [paragraphMeta.name, headingMeta.name]

const insertNewLine = (editor: Editor, position: number): void => {
  editor.chain().insertContentAt(position, { type: Paragraph.name }).run()
}

export const gapClickHandler = (editor: Editor, view: EditorView, position: number, event: MouseEvent): void => {
  if (!(event.target as HTMLElement)?.classList.contains('ProseMirror')) {
    return
  }

  // when clicked at the end of document, the latest two position will be null
  if (position - 2 < 0) return
  const node = view.state.doc.nodeAt(position - 2)
  const nextNode = view.state.doc.nodeAt(position)

  if (!nextNode) {
    if (node && paragraphLikeBlockType.includes(node.type.name)) return
    insertNewLine(editor, position)
  }
}
