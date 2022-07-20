import { OrderedList as TiptapOrderedList } from '@tiptap/extension-ordered-list'
import { ReactNodeViewRenderer } from '../../../tiptapRefactor'
import { ListView } from '../../../components/blockViews'
import { meta } from './meta'

export const OrderedList = TiptapOrderedList.extend({
  name: meta.name,

  draggable: true,

  addNodeView() {
    return ReactNodeViewRenderer(ListView)
  }
})
