import { ExtendedRegExpMatchArray, InputRule, InputRuleFinder } from '@tiptap/react'
import { NodeType } from 'prosemirror-model'

/**
 * Build an input rule that adds horizontal rule when the
 * matched text is typed into it.
 */
export function nodeInputRule(config: {
  find: InputRuleFinder
  type: NodeType
  getAttributes?: Record<string, any> | ((match: ExtendedRegExpMatchArray) => Record<string, any>) | false | null
}): InputRule {
  return new InputRule({
    find: config.find,
    handler: ({ state, range, match }) => {
      const { tr } = state
      const start = Math.max(range.from - 1, 0)
      const end = range.to

      if (match[0]) {
        tr.replaceWith(start, end, config.type.create())
      }
    }
  })
}
