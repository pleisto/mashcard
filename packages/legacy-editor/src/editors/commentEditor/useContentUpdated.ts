import { useEffect } from 'react'
import { Editor } from '@tiptap/core'
import { setDraft } from './draft'

export function useContentUpdated(editor: Editor | null, markId: string): void {
  useEffect(() => {
    const onContentUpdate = (): void => {
      if (!editor?.isDestroyed) {
        setDraft(markId, editor?.getJSON() ?? [])
      }
    }
    editor?.on('update', onContentUpdate)
    return () => {
      editor?.off('update', onContentUpdate)
    }
  }, [editor, markId])
}
