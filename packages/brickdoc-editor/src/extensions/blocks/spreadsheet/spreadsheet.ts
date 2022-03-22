import { mergeAttributes } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import { v4 as uuid } from 'uuid'
import { SpreadsheetBlockView } from '../../../components/blockViews'
import { createBlock } from '../../common'
import { SpreadsheetOptions, SpreadsheetAttributes, meta } from './meta'

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

export const Spreadsheet = createBlock<SpreadsheetOptions, SpreadsheetAttributes>({
  name: meta.name,

  group: 'block',

  selectable: false,

  atom: true,

  draggable: true,

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
        },
        renderHTML: attributes => {
          return {
            'data-spreadsheet': JSON.stringify(attributes.data)
          }
        },
        parseHTML: element => {
          const str = element.getAttribute('data-spreadsheet')
          return str ? JSON.parse(str) : { columns: [], rowCount: 0 }
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
    return ReactNodeViewRenderer(SpreadsheetBlockView)
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
