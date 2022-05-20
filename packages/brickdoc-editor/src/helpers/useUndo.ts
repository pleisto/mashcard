import { useEffect } from 'react'
import { BrickdocEventBus, Undo } from '@brickdoc/schema'
import { Editor as TiptapEditor } from '@tiptap/react'

export const useUndo = (editor: TiptapEditor | null): void => {
  useEffect(
    () =>
      BrickdocEventBus.subscribe(Undo, () => {
        editor?.commands.undo()
      }).unsubscribe,
    [editor]
  )
}
