import { Node, mergeAttributes } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import { insertBlockAt } from '../../helpers/commands'
import { Table } from './Table'
import { ExtensionBaseOptions } from '../baseOptions'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    tableBlock: {
      /**
       * Set a table block
       */
      setTableBlock: (position?: number) => ReturnType
    }
  }
}

export interface DatabaseRow {
  id: string
  [key: string]: any
}
export interface DatabaseRows extends Array<DatabaseRow> {}

export interface TableBlockOptions extends ExtensionBaseOptions {}

export const TableBlockExtension = Node.create<TableBlockOptions>({
  name: 'tableBlock',

  group: 'block',

  selectable: false,

  allowGapCursor: false,

  addAttributes() {
    return {
      data: {
        default: {
          columns: []
        }
      }
    }
  },

  parseHTML() {
    return [
      {
        tag: 'table-block'
      }
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['table-block', mergeAttributes(HTMLAttributes)]
  },

  addNodeView() {
    return ReactNodeViewRenderer(Table)
  },

  addCommands() {
    return {
      setTableBlock:
        (position?: number) =>
        ({ chain }) => {
          return insertBlockAt({ type: this.name }, chain, position)
        }
    }
  }
})
