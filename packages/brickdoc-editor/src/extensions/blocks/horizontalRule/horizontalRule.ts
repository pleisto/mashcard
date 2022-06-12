import { ReactNodeViewRenderer } from '@tiptap/react'
import { HorizontalRule as TiptapHorizontalRule } from '@tiptap/extension-horizontal-rule'
import { HorizontalRuleView } from '../../../components/blockViews'
import { meta } from './meta'

export const HorizontalRule = TiptapHorizontalRule.extend({
  name: meta.name,

  addNodeView() {
    return ReactNodeViewRenderer(HorizontalRuleView)
  }
})
