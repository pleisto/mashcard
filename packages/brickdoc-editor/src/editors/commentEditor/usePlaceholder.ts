import { Editor } from '@tiptap/core'
import { useContext, useState, useEffect, useRef } from 'react'
import { EditorContext } from '../../context/EditorContext'

export function usePlaceholder(editor: Editor | null): [string] {
  const { t } = useContext(EditorContext)
  const placeholderText = t('discussion.editor.placeholder')
  const [placeholder, setPlaceholder] = useState(editor?.isEmpty ? placeholderText : '')
  const unmount = useRef(false)

  useEffect(
    () => () => {
      unmount.current = true
    },
    []
  )
  useEffect(() => {
    const checkPlaceholder = (): void => {
      if (unmount.current) return
      if (editor?.isDestroyed) return
      if (editor?.isEmpty && !placeholder) setPlaceholder(placeholderText)
      if (!editor?.isEmpty && placeholder) setPlaceholder('')
    }

    editor?.on('update', checkPlaceholder).on('create', checkPlaceholder)

    return () => {
      editor?.off('update', checkPlaceholder).off('create', checkPlaceholder)
    }
  }, [editor, placeholder, placeholderText])

  return [placeholder]
}
