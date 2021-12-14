import { Block } from '@/BrickdocGraphQL'
import { editorVar } from '@/docs/reactiveVars'
import { useReactiveVar } from '@apollo/client'
import React from 'react'
import { DocMeta } from '../DocumentContentPage'

export function useDocumentEditable(
  docMeta: DocMeta,
  currentRootBlock: Block | undefined
): [boolean, React.Dispatch<React.SetStateAction<boolean>>] {
  // if there is no doc id, document will not have deleted status
  const [documentEditable, setDocumentEditable] = React.useState(!docMeta.id)
  const editor = useReactiveVar(editorVar)

  React.useEffect(() => {
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
  }, [currentRootBlock, editor, docMeta.editable])

  return [documentEditable, setDocumentEditable]
}
