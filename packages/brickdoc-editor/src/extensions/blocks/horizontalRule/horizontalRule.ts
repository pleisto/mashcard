import { ReactNodeViewRenderer } from '@tiptap/react'
import { HorizontalRule as TiptapHorizontalRule } from '@tiptap/extension-horizontal-rule'
import { HorizontalRuleView } from '../../../components/blockViews'

export const HorizontalRule = TiptapHorizontalRule.extend({
  addNodeView() {
    return ReactNodeViewRenderer(HorizontalRuleView)
  }
})
