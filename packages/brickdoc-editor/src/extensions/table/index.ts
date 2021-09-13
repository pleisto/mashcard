import { v4 as uuid } from 'uuid'
import { Node, mergeAttributes } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import { Table } from './Table'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    tableBlock: {
      /**
       * Set a table block
       */
      setTableBlock: () => ReturnType
    }
  }
}

export interface DatabaseRow {
  id: string
  sort: number
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
          columns: [
            {
              title: 'Task name',
              type: 'text',
              key: uuid()
            }
          ]
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
        () =>
        ({ commands }) => {
          return commands.replace(this.name)
        }
    }
  }
})
