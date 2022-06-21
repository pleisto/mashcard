import React from 'react'
import { useEditor, JSONContent, EditorEvents, Editor } from '@tiptap/react'
import {
  BrickdocEventBus,
  FormulaEditorBlurTrigger,
  FormulaEditorReplaceRootTrigger,
  FormulaEditorUpdateTrigger
} from '@brickdoc/schema'
import { Base } from '../../extensions/base'
import { buildJSONContentByArray } from '../../helpers'

export interface UseFormulaEditorProps {
  content: JSONContent | undefined
  editable: boolean
  onBlur?: () => void
  rootId?: string
  formulaId?: string
}

export function useFormulaEditor({
  editable,
  content,
  onBlur,
  rootId,
  formulaId
}: UseFormulaEditorProps): Editor | null {
  const editor = useEditor({
    editable,
    autofocus: 'end',
    content,
    extensions: [
      Base.configure({
        document: true,
        text: true,
        paragraph: {
          native: true
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
    onBlur: ({ editor, transaction }) => {
      if (rootId && formulaId) {
        const editorPosition = transaction.selection.from - 1
        const content = editor.getJSON()
        BrickdocEventBus.dispatch(FormulaEditorBlurTrigger({ formulaId, rootId, content, position: editorPosition }))
      }
    },
    onUpdate: ({ editor, transaction }) => {
      if (rootId && formulaId) {
        const editorPosition = transaction.selection.from - 1
        const content = editor.getJSON()
        BrickdocEventBus.dispatch(FormulaEditorUpdateTrigger({ formulaId, rootId, content, position: editorPosition }))
      }
    }
  })

  React.useEffect(() => {
    if (editor && !editor.isDestroyed && editable && rootId && formulaId) {
      const defaultContent: JSONContent = buildJSONContentByArray([])

      const listener = BrickdocEventBus.subscribe(
        FormulaEditorReplaceRootTrigger,
        async e => {
          const content = e.payload.content ?? defaultContent
          const position = e.payload.position

          editor.chain().replaceRoot(content).setTextSelection(position).run()

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

  return editor
}
