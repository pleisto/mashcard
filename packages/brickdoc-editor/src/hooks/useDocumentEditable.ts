import { useState } from 'react'
import { useExternalProps } from './useExternalProps'

export function useDocumentEditable(defaultEditable: boolean | undefined): [boolean] {
  const externalProps = useExternalProps()
  const [documentEditable, setEditable] = useState(externalProps.documentEditable)
  externalProps.onUpdate(type => {
    if (type === 'documentEditable') {
      setEditable(externalProps.documentEditable)
    }
  })

  return [defaultEditable ?? documentEditable]
}
