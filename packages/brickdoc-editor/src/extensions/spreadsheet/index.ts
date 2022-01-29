import { Node, mergeAttributes } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import { v4 as uuid } from 'uuid'
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
      isNew: {
        default: false
      },
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
          return chain()
            .insertBlockAt(
              {
                type: this.name,
                attrs: {
                  isNew: true,
                  data: {
                    columns: [
                      { uuid: uuid(), sort: 0 },
                      { uuid: uuid(), sort: 1 }
                    ],
                    rowCount: 0
                  }
                }
              },
              position
            )
            .run()
        }
    }
  }
})
