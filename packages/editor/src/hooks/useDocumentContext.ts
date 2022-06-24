import { useContext } from 'react'
import { DocumentContext, DocumentContextData } from '../context/DocumentContext'

export function useDocumentContext(): DocumentContextData {
  return useContext(DocumentContext)
}
