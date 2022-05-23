import { Embedtype } from '@brickdoc/schema'
import { Editor } from '@tiptap/core'

export const dropImageHandler = (editor: Editor, event: DragEvent): boolean => {
  const files = event.dataTransfer?.files ?? []

  if (files?.length === 0) return false

  for (let i = 0; i < files?.length; i += 1) {
    const file = files[i]

    if (file?.type.includes('image')) {
      const position = editor.view.posAtCoords({ left: event.clientX, top: event.clientY })?.pos
      editor.commands.setEmbedBlock(Embedtype.Upload, file, position)
    }
  }

  return true
}
