import { Paragraph as TiptapParagraph } from '@tiptap/extension-paragraph'
import { ReactNodeViewRenderer } from '@tiptap/react'
import { ParagraphView } from '../../../components/blockViews'
import { meta } from './meta'

export const NativeParagraph = TiptapParagraph

export const Paragraph = TiptapParagraph.extend({
  name: meta.name,

  draggable: true,

  addNodeView() {
    return ReactNodeViewRenderer(ParagraphView)
  }
})
