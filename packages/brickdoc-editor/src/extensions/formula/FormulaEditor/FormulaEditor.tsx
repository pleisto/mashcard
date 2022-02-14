import React from 'react'
import Document from '@tiptap/extension-document'
import Text from '@tiptap/extension-text'
import Paragraph from '@tiptap/extension-paragraph'
import { useEditor, EditorContent, JSONContent, EditorEvents } from '@tiptap/react'
import { devLog } from '@brickdoc/design-system'
import { HandleKeyDownExtension } from './extensions/handleKeyDown'
import './FormulaEditor.less'
import { FormulaTypeExtension } from './extensions/formulaType'
import { BrickdocEventBus, FormulaEditorReplaceRootTrigger, FormulaEditorUpdateEventTrigger } from '@brickdoc/schema'

export interface EditorContentType {
  content: JSONContent | undefined
  position: number
}

export interface FormulaEditorProps {
  editorContent: EditorContentType
  editable: boolean
  onBlur?: () => void
  rootId?: string
  formulaId?: string
}

const findNearestWord = (content: string, targetIndex: number): string | undefined =>
  content.split(' ').find((word, index) => index + word.length >= targetIndex)

export const FormulaEditor: React.FC<FormulaEditorProps> = ({ editable, editorContent, onBlur, rootId, formulaId }) => {
  const editor = useEditor({
    editable,
    autofocus: 'end',
    content: editorContent.content,
    extensions: [
      Document,
      Text,
      Paragraph,
      FormulaTypeExtension.configure({ editable }),
      HandleKeyDownExtension({ formulaId, rootId })
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

      if (rootId && formulaId) {
        const jsonContent = editor.getJSON()
        // devLog('formualEditor debug', { jsonContent, editorContent })
        BrickdocEventBus.dispatch(
          FormulaEditorUpdateEventTrigger({ position: editorPosition, content: jsonContent, formulaId, rootId })
        )
      }
    }
  })

  React.useEffect(() => {
    if (editor && !editor.isDestroyed && editable && rootId && formulaId) {
      const listener = BrickdocEventBus.subscribe(
        FormulaEditorReplaceRootTrigger,
        e => {
          const content = e.payload.content
          const position: number = e.payload.position
          if (content) {
            if (position) {
              editor
                .chain()
                .replaceRoot(content)
                .setTextSelection(position + 1)
                .run()
            } else {
              editor.commands.replaceRoot(content)
            }
          }

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
