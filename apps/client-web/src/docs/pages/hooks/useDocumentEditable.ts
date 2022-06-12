import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Block } from '@/BrickdocGraphQL'
import { editorVar } from '@/docs/reactiveVars'
import { useReactiveVar } from '@apollo/client'
import { useDocMeta } from '@/docs/store/DocMeta'

export function useDocumentEditable(
  freeze: boolean,
  currentRootBlock: Block | undefined
): [boolean, Dispatch<SetStateAction<boolean>>] {
  const { id, editable } = useDocMeta()
  // if there is no doc id, document will not have deleted status
  const [documentEditable, setDocumentEditable] = useState(!freeze && !id)
  const editor = useReactiveVar(editorVar)

  useEffect(() => {
    if (freeze) return
    if (currentRootBlock) {
      if (editor && !editor.isDestroyed) {
        const nextEditable = editable
        if (editor.options.editable !== nextEditable) {
          editor.options.editable = nextEditable
          editor.view.update(editor.view.props)
          setDocumentEditable(nextEditable)
        }
      }
    }
  }, [currentRootBlock, editor, editable, freeze])

  return [documentEditable, setDocumentEditable]
}
