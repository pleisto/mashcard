import React from 'react'
import { useEditor, JSONContent, EditorEvents, Editor } from '@tiptap/react'
import { Placeholder } from '@tiptap/extension-placeholder'
import {
  MashcardEventBus,
  FormulaEditorBlurTrigger,
  FormulaEditorReplaceRootTrigger,
  FormulaEditorUpdateTrigger
} from '@mashcard/schema'
import { Base, updateExtensionOptions } from '../../extensions/base'
import { buildJSONContentByArray } from '../../helpers'

export interface UseFormulaEditorProps {
  content: JSONContent | undefined
  editable: boolean
  rootId?: string
  formulaId?: string
  placeholder?: string
  maxScreen?: boolean
}

export function useFormulaEditor({
  editable,
  content,
  rootId,
  formulaId,
  maxScreen,
  placeholder
}: UseFormulaEditorProps): Editor | null {
  const editor = useEditor({
    editable,
    autofocus: 'end',
    content,
    extensions: [
      Base.configure({
        document: true,
        text: true,
        paragraph: { native: true },
        formulaType: true,
        formulaKeyDown: { formulaId, rootId, maxScreen }
      }),
      ...(placeholder ? [Placeholder.configure({ placeholder })] : [])
    ],
    onFocus: (props: EditorEvents['focus']) => {
      // console.debug('FormulaEditor:onFocus', props)
    },
    onBlur: ({ editor, transaction }) => {
      if (rootId && formulaId) {
        const editorPosition = transaction.selection.from - 1
        const content = editor.getJSON()
        MashcardEventBus.dispatch(FormulaEditorBlurTrigger({ formulaId, rootId, content, position: editorPosition }))
      }
    },
    onUpdate: ({ editor, transaction }) => {
      if (rootId && formulaId) {
        const editorPosition = transaction.selection.from - 1
        const content = editor.getJSON()
        MashcardEventBus.dispatch(FormulaEditorUpdateTrigger({ formulaId, rootId, content, position: editorPosition }))
      }
    }
  })

  React.useEffect(() => {
    if (!editor) return
    updateExtensionOptions(editor.extensionManager.extensions, { formulaKeyDown: { formulaId, rootId, maxScreen } })
  }, [editor, formulaId, rootId, maxScreen])

  React.useEffect(() => {
    if (editor && !editor.isDestroyed && editable && rootId && formulaId) {
      const defaultContent: JSONContent = buildJSONContentByArray([])

      const listener = MashcardEventBus.subscribe(
        FormulaEditorReplaceRootTrigger,
        async e => {
          const content = e.payload.content ?? defaultContent
          const position = e.payload.position

          editor.chain().replaceRoot(content).setTextSelection(position).run()

          // if (editable) console.log('after replace root', { content, position })
        },
        { eventId: `${rootId},${formulaId}`, subscribeId: `FormulaEditor#${rootId},${formulaId}` }
      )
      return () => listener.unsubscribe()
    }
  }, [formulaId, rootId, editor, editable])

  return editor
}
