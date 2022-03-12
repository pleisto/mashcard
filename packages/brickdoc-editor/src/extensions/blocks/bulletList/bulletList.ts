import { BulletList as TiptapBulletList } from '@tiptap/extension-bullet-list'
import { ReactNodeViewRenderer } from '@tiptap/react'
import { ListView } from '../../../components/blockViews'

export const BulletList = TiptapBulletList.extend({
  draggable: true,
  addNodeView() {
    return ReactNodeViewRenderer(ListView)
  }
})
