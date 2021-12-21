import React from 'react'
import { Editor } from '@tiptap/react'
import { TFunction } from 'react-i18next'

export interface EditorContextData {
  editor?: Editor | null
  t: TFunction<string[], undefined>
}

export const EditorContext = React.createContext<EditorContextData>({
  editor: null,
  t: (key?: string) => key
})
