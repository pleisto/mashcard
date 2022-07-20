import { Heading as TiptapHeading } from '@tiptap/extension-heading'
import { ReactNodeViewRenderer } from '../../../tiptapRefactor'
import { HeadingView } from '../../../components/blockViews'
import { meta } from './meta'

export const Heading = TiptapHeading.extend({
  name: meta.name,

  // specify marks for excluding anchor mark
  marks: 'bold italic link strike textStyle discussion',

  draggable: true,

  addNodeView() {
    return ReactNodeViewRenderer(HeadingView)
  }
})
