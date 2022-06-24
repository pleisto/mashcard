import { createContext } from 'react'

export interface DocumentContextData {
  docId?: string
}

export const DocumentContext = createContext<DocumentContextData>({})
