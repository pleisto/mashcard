import { Editor } from '@tiptap/core'
import { EditorView } from 'prosemirror-view'
import { Paragraph } from '../../blocks/paragraph'
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

  const $end = editor.state.doc.resolve(editor.state.doc.content.size)

  if (position < $end.pos) return
  const node = $end.nodeBefore

  if (node && paragraphLikeBlockType.includes(node.type.name)) return
  insertNewLine(editor, position)
}
