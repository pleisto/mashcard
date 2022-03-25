import { BulletList as TiptapBulletList } from '@tiptap/extension-bullet-list'
import { ReactNodeViewRenderer } from '@tiptap/react'
import { ListView } from '../../../components/blockViews'
import { meta } from './meta'

export const BulletList = TiptapBulletList.extend({
  name: meta.name,
  draggable: true,
  addNodeView() {
    return ReactNodeViewRenderer(ListView)
  }
})
