import { ReactNodeViewRenderer } from '@tiptap/react'
import { HorizontalRule as TiptapHorizontalRule } from '@tiptap/extension-horizontal-rule'
import { HorizontalRuleView } from '../../../components/blockViews'
import { meta } from './meta'
import { nodeInputRule } from './inputRule'

export const HorizontalRule = TiptapHorizontalRule.extend({
  name: meta.name,

  selectable: false,

  addNodeView() {
    return ReactNodeViewRenderer(HorizontalRuleView)
  },

  addInputRules() {
    return [
      nodeInputRule({
        find: /^(?:---|—-|___\s|\*\*\*\s)$/,
        type: this.type
      })
    ]
  }
})
