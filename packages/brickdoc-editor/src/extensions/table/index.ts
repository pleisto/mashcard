import { Node, mergeAttributes } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import { ContextInterface, VariableInterface } from '@brickdoc/formula'
import { insertBlockAt } from '../helpers/commands'
import { Table } from './Table'

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

// eslint-disable-next-line @typescript-eslint/no-empty-interface

export interface TableExtensionOptions {
  formulaContextActions: {
    getFormulaContext: () => ContextInterface | null
    getVariable: (variableId: string) => VariableInterface | null | undefined
    removeVariable: (variableId: string) => void
    calculate: (
      variableId: string | undefined,
      name: string,
      input: string,
      formulaContext: ContextInterface,
      updateResult: React.Dispatch<React.SetStateAction<any>>,
      updateVariable: React.Dispatch<React.SetStateAction<VariableInterface | undefined>>,
      updateError: React.Dispatch<
        React.SetStateAction<
          | {
              type: string
              message: string
            }
          | undefined
        >
      >,
      updateValue: React.Dispatch<React.SetStateAction<string | undefined>>,
      updateDefaultName: React.Dispatch<React.SetStateAction<string>>
    ) => void
  }
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
  formulaContextActions: TableExtensionOptions['formulaContextActions']
  useDatabaseRows: TableExtensionOptions['useDatabaseRows']
}

export const TableBlockExtension = Node.create<TableBlockOptions>({
  name: 'tableBlock',

  group: 'block',

  selectable: false,

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
