import { createContext } from 'react'
import { Editor } from '@tiptap/core'

export interface EditorContextData {
  editor?: Editor | null
  documentEditable: boolean
}

export const EditorContext = createContext<EditorContextData>({
  editor: null,
  documentEditable: false
})
