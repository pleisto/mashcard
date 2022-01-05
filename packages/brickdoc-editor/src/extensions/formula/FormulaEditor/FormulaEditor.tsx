import React, { MutableRefObject, useEffect } from 'react'
import Document from '@tiptap/extension-document'
import Text from '@tiptap/extension-text'
import Paragraph from '@tiptap/extension-paragraph'
import { useEditor, EditorContent, JSONContent } from '@tiptap/react'
import { HandleKeyDownExtension, KeyDownHandlerType } from './extensions/handleKeyDown'
import './FormulaEditor.less'
import { FormulaTypeExtension } from './extensions/formulaType'
import { contentArrayToInput, fetchJSONContentArray } from '../../../helpers'

export interface FormulaEditorProps {
  content: JSONContent | undefined
  editable: boolean
  position?: MutableRefObject<number>
  updatePosition?: MutableRefObject<React.Dispatch<React.SetStateAction<number>>>
  updateContent?: (text: string) => void
  keyDownHandler?: KeyDownHandlerType
}

const findNearestWord = (content: string, targetIndex: number): string | undefined =>
  content.split(' ').find((word, index) => index + word.length >= targetIndex)

export const FormulaEditor: React.FC<FormulaEditorProps> = ({
  content,
  editable,
  position: pos,
  updatePosition,
  updateContent,
  keyDownHandler
}) => {
  const editor = useEditor({
    editable,
    extensions: [
      Document,
      Text,
      Paragraph,
      FormulaTypeExtension.configure({ editable }),
      HandleKeyDownExtension(keyDownHandler)
    ],
    onUpdate: ({ editor, transaction }) => {
      const jsonContent = editor.getJSON()
      const text = `=${contentArrayToInput(fetchJSONContentArray(jsonContent))}`
      const position = transaction.selection.from - 1
      if (transaction.selection.from === transaction.selection.to && position >= 1) {
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
          if (length + blockLength >= position) {
            if (block.type !== 'text') break

            const word = findNearestWord(block.text!, position - length - 1)
            console.info({ word, pos: position - length - 1 })
          }

          length += blockLength
        }
      }

      updatePosition?.current(position)
      updateContent?.(text)
    }
  })

  useEffect(() => {
    if (editor && !editor.isDestroyed && content) {
      if (pos) {
        editor
          .chain()
          .replaceRoot(content)
          .setTextSelection(pos.current + 1)
          .run()
      } else {
        editor.commands.replaceRoot(content)
      }

      if (editable) console.log({ content, editor, pos: pos?.current, label: 'after replace root' })
    }
  }, [editor, content, pos, editable])

  return (
    <>
      <EditorContent className="brickdoc-formula-editor" editor={editor} />
    </>
  )
}
