import { createContext } from 'react'
import { Editor } from '@tiptap/react'

export interface EditorContextData {
  editor?: Editor | null
}

export const EditorContext = createContext<EditorContextData>({
  editor: null
})
