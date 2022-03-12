import { Heading as TiptapHeading } from '@tiptap/extension-heading'
import { ReactNodeViewRenderer } from '@tiptap/react'
import { HeadingView } from '../../../components/blockViews'

export const Heading = TiptapHeading.extend({
  marks: 'bold italic link strike textStyle discussion',
  draggable: true,
  addNodeView() {
    return ReactNodeViewRenderer(HeadingView)
  }
})
