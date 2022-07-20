import { Editor, ExtendedRegExpMatchArray, InputRule, InputRuleFinder } from '@tiptap/core'
import { TextSelection } from 'prosemirror-state'
import { NodeType } from 'prosemirror-model'
import { Paragraph } from '../paragraph'

/**
 * Build an input rule that adds horizontal rule when the
 * matched text is typed into it.
 */
export function nodeInputRule(config: {
  editor: Editor
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

        const posStart = start + 1
        const posAfter = end + 1
        const nodeAfter = state.doc.nodeAt(posAfter)

        if (nodeAfter) {
          tr.setSelection(TextSelection.create(tr.doc, posStart + 1))
        } else {
          // add node after horizontal rule if it’s the end of the document
          const node = config.editor.schema.nodeFromJSON({ type: Paragraph.name })

          if (node) {
            tr.insert(posStart, node)
            tr.setSelection(TextSelection.create(tr.doc, posStart))
          }
        }

        tr.scrollIntoView()
      }
    }
  })
}
