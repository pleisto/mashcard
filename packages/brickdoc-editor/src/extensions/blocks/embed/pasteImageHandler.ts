import { Embedtype } from '@brickdoc/schema'
import { Editor } from '@tiptap/core'

export const pasteImageHandler = (editor: Editor, event: ClipboardEvent): boolean => {
  const files = event.clipboardData?.files ?? []

  if (files?.length === 0) return false

  for (let i = 0; i < files?.length; i += 1) {
    const file = files[i]

    if (file?.type.includes('image')) {
      editor.commands.setEmbedBlock(Embedtype.Upload, file)
    }
  }

  return true
}
