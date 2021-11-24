import { ChainedCommands, Content } from '@tiptap/core'
import { NodeType } from 'prosemirror-model'
import { TextSelection } from 'prosemirror-state'

export function insertBlockAt(content: Content, chain: () => ChainedCommands, position?: number): boolean {
  const command = position === undefined ? chain().insertContent(content) : chain().insertContentAt(position, content)
  return command.run()
}

export function setBlock(chain: () => ChainedCommands, nodeType: string | NodeType, attrs?: Record<string, any>): boolean {
  return chain()
    .setNode(nodeType, attrs)
    .command(({ tr, dispatch }) => {
      if (dispatch) {
        const { parent, pos } = tr.selection.$from
        const posAfter = pos + 1
        const nodeAfter = tr.doc.nodeAt(posAfter)

        // end of document
        if (!nodeAfter) {
          const node = parent.type.contentMatch.defaultType?.create()

          if (node) {
            tr.insert(posAfter, node)
            tr.setSelection(TextSelection.create(tr.doc, posAfter))
          }
        }

        tr.scrollIntoView()
      }

      return true
    })
    .run()
}
