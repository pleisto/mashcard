import React from 'react'
import Document from '@tiptap/extension-document'
import Text from '@tiptap/extension-text'
import Paragraph from '@tiptap/extension-paragraph'
import { useEditor, EditorContent, JSONContent, EditorEvents } from '@tiptap/react'
import { devLog } from '@brickdoc/design-system'
import { HandleKeyDownExtension } from './extensions/handleKeyDown'
import './FormulaEditor.less'
import { FormulaTypeExtension } from './extensions/formulaType'
import { BrickdocEventBus, FormulaEditorReplaceRootTrigger } from '@brickdoc/schema'

export interface EditorContentType {
  content: JSONContent | undefined
  input: string
  position: number
}

export interface FormulaEditorProps {
  editorContent: EditorContentType
  editable: boolean
  onBlur?: () => void
  updateEditor?: (content: JSONContent, position: number) => void
  rootId?: string
  formulaId?: string
}

const findNearestWord = (content: string, targetIndex: number): string | undefined =>
  content.split(' ').find((word, index) => index + word.length >= targetIndex)

export const FormulaEditor: React.FC<FormulaEditorProps> = ({
  editable,
  editorContent,
  updateEditor,
  onBlur,
  rootId,
  formulaId
}) => {
  const editor = useEditor({
    editable,
    autofocus: 'end',
    content: editorContent.content,
    extensions: [
      Document,
      Text,
      Paragraph,
      FormulaTypeExtension.configure({ editable }),
      HandleKeyDownExtension.configure({ formulaId, rootId })
    ],
    onFocus: (props: EditorEvents['focus']) => {
      // console.debug('FormulaEditor:onFocus', props)
    },
    onBlur: (props: EditorEvents['blur']) => {
      // NOTE Very hacky way to prevent blur hook
      // TODO WHY IS THIS CALLED?
      // = -> =1
      // =1 -> =
      if (props.event.relatedTarget) {
        devLog('FormulaEditor:onBlur', props)
        onBlur?.()
      }
    },
    onUpdate: ({ editor, transaction }) => {
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
            devLog('matched', { word, position: editorPosition - length - 1 })
          }

          length += blockLength
        }
      }

      if (rootId && formulaId && updateEditor) {
        const jsonContent = editor.getJSON()
        updateEditor(jsonContent, editorPosition)
      }
    }
  })

  React.useEffect(() => {
    if (editor && !editor.isDestroyed && editable && rootId && formulaId) {
      const defaultContent: JSONContent = { type: 'doc', content: [{ type: 'paragraph', content: [] }] }

      const listener = BrickdocEventBus.subscribe(
        FormulaEditorReplaceRootTrigger,
        e => {
          const content = e.payload.content ?? defaultContent
          const position: number = e.payload.position

          editor
            .chain()
            .replaceRoot(content)
            .setTextSelection(position + 1)
            .run()

          // if (editable) console.log('after replace root', { content, position })
        },
        {
          eventId: `${rootId},${formulaId}`,
          subscribeId: `FormulaEditor#${rootId},${formulaId}`
        }
      )
      return () => listener.unsubscribe()
    }
  }, [formulaId, rootId, editor, editable])

  return (
    <>
      <EditorContent className="brickdoc-formula-editor" editor={editor} />
    </>
  )
}
