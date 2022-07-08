import { Editor } from '@tiptap/core'
import { TextSelection } from 'prosemirror-state'
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

  const endSelection = TextSelection.atEnd(editor.state.doc)

  if (position < endSelection.to) return
  const node = endSelection.$to.node()

  if (node && paragraphLikeBlockType.includes(node.type.name)) return
  insertNewLine(editor, position)
}
