import React from 'react'
import { useEditor, EditorContent, JSONContent, EditorEvents } from '@tiptap/react'
import { devLog } from '@brickdoc/design-system'
import { BrickdocEventBus, FormulaEditorReplaceRootTrigger, FormulaEditorUpdateTrigger } from '@brickdoc/schema'
import { Base } from '../../extensions/base'
import { BrickdocFomulaEditor } from './style'

export interface FormulaEditorProps {
  content: JSONContent | undefined
  editable: boolean
  onBlur?: () => void
  rootId?: string
  formulaId?: string
  width?: number
  minHeight?: number
}

const findNearestWord = (content: string, targetIndex: number): string | undefined =>
  content.split(' ').find((word, index) => index + word.length >= targetIndex)

export const FormulaEditor: React.FC<FormulaEditorProps> = ({
  editable,
  content,
  onBlur,
  rootId,
  formulaId,
  width,
  minHeight
}) => {
  const editor = useEditor({
    editable,
    autofocus: 'end',
    content,
    extensions: [
      Base.configure({
        document: true,
        text: true,
        paragraph: {
          native: true,
          placeholder: ''
        },
        formulaType: true,
        formulaKeyDown: {
          formulaId,
          rootId
        }
      })
    ],
    onFocus: (props: EditorEvents['focus']) => {
      // console.debug('FormulaEditor:onFocus', props)
    },
    onBlur: (props: EditorEvents['blur']) => {
      onBlur?.()
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
        const content = editor.getJSON()
        BrickdocEventBus.dispatch(FormulaEditorUpdateTrigger({ formulaId, rootId, content, position: editorPosition }))
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
      <EditorContent
        style={{
          ...(width ? { width: `${width}px` } : {}),
          ...(minHeight ? { minHeight: `${minHeight}px` } : {})
        }}
        className={BrickdocFomulaEditor}
        editor={editor}
      />
    </>
  )
}
