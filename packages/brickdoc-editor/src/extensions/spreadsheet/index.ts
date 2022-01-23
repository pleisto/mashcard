import { Node, mergeAttributes } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import { insertBlockAt } from '../../helpers/commands'
import { Spreadsheet } from '../../components'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    spreadsheetBlock: {
      /**
       * Set a spreadsheet block
       */
      setSpreadsheetBlock: (position?: number) => ReturnType
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface SpreadsheetBlockOptions {}

export const SpreadsheetBlockExtension = Node.create<SpreadsheetBlockOptions>({
  name: 'spreadsheetBlock',

  group: 'block',

  selectable: false,

  allowGapCursor: false,

  addAttributes() {
    return {
      data: {
        default: {
          columns: [],
          rowsCount: 0
        }
      },
      title: {
        default: ''
      }
    }
  },

  parseHTML() {
    return [
      {
        tag: 'spreadsheet-block'
      }
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['spreadsheet-block', mergeAttributes(HTMLAttributes)]
  },

  addNodeView() {
    return ReactNodeViewRenderer(Spreadsheet)
  },

  addCommands() {
    return {
      setSpreadsheetBlock:
        (position?: number) =>
        ({ chain }) => {
          return insertBlockAt({ type: this.name }, chain, position)
        }
    }
  }
})
