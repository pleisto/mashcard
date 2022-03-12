import { Paragraph as TiptapParagraph } from '@tiptap/extension-paragraph'
import { ReactNodeViewRenderer } from '@tiptap/react'
import { ParagraphView } from '../../../components/blockViews'

export const Paragraph = TiptapParagraph.extend({
  draggable: true,
  addNodeView() {
    return ReactNodeViewRenderer(ParagraphView)
  }
})
