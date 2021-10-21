import { EditorContentProps } from '@brickdoc/editor'
import React from 'react'

export type Editor = EditorContentProps['editor']

export interface PageEditorValue {
  editor: Editor | null
  setEditor: (editor: Editor) => void
}

export const PageEditorContext = React.createContext<PageEditorValue>({
  editor: null,
  setEditor: () => {}
})

export const usePageEditorContextValue = (): PageEditorValue => {
  const [editor, setEditor] = React.useState<Editor>(null)
  return React.useMemo(
    () => ({
      editor,
      setEditor
    }),
    [editor]
  )
}
