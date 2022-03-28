import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Block } from '@/BrickdocGraphQL'
import { editorVar } from '@/docs/reactiveVars'
import { useReactiveVar } from '@apollo/client'
import { DocMeta } from '../DocumentContentPage'

export function useDocumentEditable(
  freeze: boolean,
  docMeta: DocMeta,
  currentRootBlock: Block | undefined
): [boolean, Dispatch<SetStateAction<boolean>>] {
  // if there is no doc id, document will not have deleted status
  const [documentEditable, setDocumentEditable] = useState(!freeze && !docMeta.id)
  const editor = useReactiveVar(editorVar)

  useEffect(() => {
    if (freeze) return
    if (currentRootBlock) {
      if (editor) {
        const nextEditable = docMeta.editable
        if (editor.options.editable !== nextEditable) {
          editor.options.editable = nextEditable
          editor.view.update(editor.view.props)
          setDocumentEditable(nextEditable)
        }
      }
    }
  }, [currentRootBlock, editor, docMeta.editable, freeze])

  return [documentEditable, setDocumentEditable]
}
