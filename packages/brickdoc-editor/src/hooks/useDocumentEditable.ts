import { useEffect, useState } from 'react'
import { useEditorPropsContext } from './useEditorPropsContext'

export function useDocumentEditable(defaultEditable: boolean | undefined): [boolean] {
  const editorProps = useEditorPropsContext()
  const [documentEditable, setEditable] = useState(editorProps.documentEditable)

  useEffect(() => {
    if (documentEditable !== editorProps.documentEditable) {
      setEditable(editorProps.documentEditable)
    }
  }, [documentEditable, editorProps.documentEditable])

  return [defaultEditable ?? documentEditable]
}
