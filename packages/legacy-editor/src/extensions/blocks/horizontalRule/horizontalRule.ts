import { ReactNodeViewRenderer } from '../../../tiptapRefactor'
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

  addCommands() {
    return {
      setHorizontalRule:
        () =>
        ({ chain }) => {
          return chain().insertContent({ type: this.name }).run()
        }
    }
  },

  addInputRules() {
    return [
      nodeInputRule({
        find: /^(?:---|—-|___\s|\*\*\*\s)$/,
        type: this.type,
        editor: this.editor
      })
    ]
  }
})
