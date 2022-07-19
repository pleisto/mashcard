import { useEffect } from 'react'
import { MashcardEventBus, Undo } from '@mashcard/schema'
import { Editor as TiptapEditor } from '@tiptap/react'

export const useUndo = (editor: TiptapEditor | null): void => {
  useEffect(
    () =>
      MashcardEventBus.subscribe(Undo, () => {
        editor?.commands.undo()
      }).unsubscribe,
    [editor]
  )
}
