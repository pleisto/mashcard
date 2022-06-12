import { useEditorContext } from './useEditorContext'

export function useDocumentEditable(defaultEditable: boolean | undefined): [boolean] {
  const { documentEditable } = useEditorContext()

  return [defaultEditable ?? documentEditable]
}
