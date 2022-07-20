import { useEffect } from 'react'
import { MashcardEventBus, Undo } from '@mashcard/schema'
import { Editor } from '@tiptap/core'

export const useUndo = (editor: Editor | null): void => {
  useEffect(
    () =>
      MashcardEventBus.subscribe(Undo, () => {
        editor?.commands.undo()
      }).unsubscribe,
    [editor]
  )
}
