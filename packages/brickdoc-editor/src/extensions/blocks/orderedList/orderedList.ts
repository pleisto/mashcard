import { OrderedList as TiptapOrderedList } from '@tiptap/extension-ordered-list'
import { ReactNodeViewRenderer } from '@tiptap/react'
import { ListView } from '../../../components/blockViews'

export const OrderedList = TiptapOrderedList.extend({
  draggable: true,
  addNodeView() {
    return ReactNodeViewRenderer(ListView)
  }
})
