import { FC, HTMLProps, useEffect, useRef } from 'react'
import { Editor } from '@tiptap/core'

export interface EditorContentProps extends HTMLProps<HTMLDivElement> {
  editor: Editor | null
}

export const EditorContent: FC<EditorContentProps> = ({ editor, ...props }) => {
  const editorContentRef = useRef<HTMLDivElement>(null)

  // initial editor content
  useEffect(() => {
    if (
      (editor?.isDestroyed ?? true) ||
      !editor?.options.element ||
      !editorContentRef.current ||
      editorContentRef.current.childNodes.length > 0
    )
      return

    const element = editorContentRef.current

    element.append(...Array.from(editor.options.element.childNodes))

    editor.setOptions({
      element
    })
  }, [editor])

  // umount
  useEffect(
    () => () => {
      if (!editor) return

      if (!editor.isDestroyed) {
        editor.view.setProps({
          nodeViews: {}
        })
      }

      if (!editor.options.element.firstChild) return

      const newElement = document.createElement('div')

      newElement.append(...Array.from(editor.options.element.childNodes))

      editor.setOptions({
        element: newElement
      })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )
  return <div {...props} ref={editorContentRef} />
}
