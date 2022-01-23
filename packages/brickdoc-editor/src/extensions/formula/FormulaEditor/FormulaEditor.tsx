import React, { useEffect } from 'react'
import Document from '@tiptap/extension-document'
import Text from '@tiptap/extension-text'
import Paragraph from '@tiptap/extension-paragraph'
import { useEditor, EditorContent, JSONContent, EditorEvents } from '@tiptap/react'
import { HandleKeyDownExtension } from './extensions/handleKeyDown'
import './FormulaEditor.less'
import { FormulaTypeExtension } from './extensions/formulaType'
import { contentArrayToInput, fetchJSONContentArray } from '../../../helpers'
import { BrickdocEventBus, FormulaEditorUpdateEventTrigger } from '@brickdoc/schema'

export interface FormulaEditorProps {
  content: JSONContent | undefined
  editable: boolean
  position?: number
  onBlur?: (props: EditorEvents['blur']) => void
  rootId?: string
  formulaId?: string
}

const findNearestWord = (content: string, targetIndex: number): string | undefined =>
  content.split(' ').find((word, index) => index + word.length >= targetIndex)

export const FormulaEditor: React.FC<FormulaEditorProps> = ({
  content,
  editable,
  position,
  onBlur,
  rootId,
  formulaId
}) => {
  const editor = useEditor({
    editable,
    extensions: [
      Document,
      Text,
      Paragraph,
      FormulaTypeExtension.configure({ editable }),
      HandleKeyDownExtension({ formulaId, rootId })
    ],
    onBlur,
    onUpdate: ({ editor, transaction }) => {
      const jsonContent = editor.getJSON()
      const input = contentArrayToInput(fetchJSONContentArray(jsonContent))
      const editorPosition = transaction.selection.from - 1
      if (transaction.selection.from === transaction.selection.to && editorPosition >= 1) {
        const blocks: JSONContent[] = editor.getJSON().content?.[0].content ?? []
        let length = 0

        for (const block of blocks) {
          let blockLength = 0
          if (block.type === 'text') {
            blockLength = block.text?.length ?? 0
          } else {
            blockLength = 1
          }

          // matched
          if (length + blockLength >= editorPosition) {
            if (block.type !== 'text') break

            const word = findNearestWord(block.text!, editorPosition - length - 1)
            console.info({ word, position: editorPosition - length - 1 })
          }

          length += blockLength
        }
      }

      if (rootId && formulaId) {
        BrickdocEventBus.dispatch(
          FormulaEditorUpdateEventTrigger({ position: editorPosition, input, formulaId, rootId })
        )
      }
    }
  })

  useEffect(() => {
    if (editor && !editor.isDestroyed && content) {
      if (position) {
        editor
          .chain()
          .replaceRoot(content)
          .setTextSelection(position + 1)
          .run()
      } else {
        editor.commands.replaceRoot(content)
      }

      if (editable) console.log('after replace root', { content, editor, position })
    }
  }, [editor, content, position, editable])

  return (
    <>
      <EditorContent className="brickdoc-formula-editor" editor={editor} />
    </>
  )
}
