import { Node, mergeAttributes, JSONContent } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import { CodeFragment, Completion, ContextInterface, VariableInterface } from '@brickdoc/formula'
import { insertBlockAt } from '../../helpers/commands'
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

interface CalculateOptions {
  variable: VariableInterface | undefined
  name: string
  input: string
  codeFragmentsToJSONContent: (codeFragments: CodeFragment[] | undefined) => JSONContent | undefined
  formulaContext: ContextInterface
  updateVariable: React.Dispatch<React.SetStateAction<VariableInterface | undefined>> | undefined
  updateError: React.Dispatch<React.SetStateAction<{ type: string; message: string } | undefined>>
  updateInput: React.Dispatch<React.SetStateAction<string | undefined>>
  updateCompletions: React.Dispatch<React.SetStateAction<Completion[]>>
  updateDefaultName: React.Dispatch<React.SetStateAction<string>>
  updateContent: React.Dispatch<React.SetStateAction<JSONContent | undefined>>
}

export interface TableExtensionOptions {
  formulaContextActions: {
    getFormulaContext: () => ContextInterface | null
    getVariable: (variableId: string) => VariableInterface | null | undefined
    removeVariable: (variableId: string) => void
    calculate: (options: CalculateOptions) => void
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
