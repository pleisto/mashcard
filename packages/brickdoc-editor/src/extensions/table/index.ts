import { Node, mergeAttributes } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import { Table } from './Table'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    tableBlock: {
      /**
       * Set a table block
       */
      setTableBlock: (position: number) => ReturnType
    }
  }
}

export interface DatabaseRow {
  id: string
  [key: string]: any
}
export interface DatabaseRows extends Array<DatabaseRow> {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface

export interface TableExtensionOptions {
  useDatabaseRows: (parentId: string) => [
    DatabaseRows,
    {
      fetchRows: () => Promise<void>
      addRow: (rowIndex?: number) => DatabaseRow
      updateRow: (row: DatabaseRow, updateState?: boolean) => void
      removeRow: (rowId: string) => void
      moveRow: (fromIndex: number, toIndex: number) => DatabaseRow | undefined
      setRowsState: (rows: DatabaseRows) => void
    }
  ]
}

export interface TableBlockOptions {
  useDatabaseRows: TableExtensionOptions['useDatabaseRows']
}

export const TableBlockExtension = Node.create<TableBlockOptions>({
  name: 'tableBlock',

  group: 'block',

  selectable: false,

  defaultOptions: {
    useDatabaseRows: () => {
      throw new Error('You need configure useDatabaseRows if you want to enable tableBlock')
    }
  },

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
        (position: number) =>
        ({ commands }) => {
          return commands.insertContentAt(position, { type: this.name })
        }
    }
  }
})
