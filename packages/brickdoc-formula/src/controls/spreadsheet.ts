import { ContextInterface, NamespaceId, StringResult, uuid, VariableDisplayData } from '../types'
import {
  SpreadsheetType,
  SpreadsheetInitializer,
  SpreadsheetDynamicPersistence,
  Row,
  ColumnInitializer,
  Cell,
  SpreadsheetAllPersistence
} from './types'

export class SpreadsheetClass implements SpreadsheetType {
  _formulaContext: ContextInterface
  blockId: NamespaceId
  dynamic: boolean
  persistence?: SpreadsheetDynamicPersistence
  name: () => string
  listColumns: () => ColumnInitializer[]
  listRows: () => Row[]
  listCells: ({ rowId, columnId }: { rowId?: uuid; columnId?: uuid }) => Cell[]

  constructor({
    blockId,
    name,
    listColumns,
    listRows,
    listCells,
    dynamic,
    ctx: { meta, formulaContext }
  }: SpreadsheetInitializer) {
    this._formulaContext = formulaContext
    this.dynamic = dynamic
    this.blockId = blockId
    if (meta) {
      this.name = () => {
        const v = formulaContext.findVariable(meta.namespaceId, meta.variableId)
        if (v) {
          return v.t.name
        }
        return name
      }
    } else {
      this.name = () => name
    }
    this.listColumns = listColumns
    this.listRows = listRows
    this.listCells = listCells

    if (dynamic) {
      this.persistence = this.persistDynamic()
    }
  }

  persistDynamic(): SpreadsheetDynamicPersistence {
    return {
      blockId: this.blockId,
      spreadsheetName: this.name(),
      columns: this.listColumns(),
      rows: this.listRows(),
      cells: this.listCells({})
    }
  }

  persistAll(): SpreadsheetAllPersistence {
    return {
      blockId: this.blockId,
      rowCount: this.columnCount(),
      columnCount: this.columnCount(),
      persistence: this.persistence
    }
  }

  columnCount(): number {
    return this.listColumns().length
  }

  rowCount(): number {
    return this.listRows().length
  }

  getRow(rowId: string): Row | undefined {
    return this.listRows().find(row => row.rowId === rowId)
  }

  getColumnById(columnId: string): ColumnInitializer | undefined {
    return this.listColumns().find(col => col.columnId === columnId)
  }

  getColumnByName(name: string): ColumnInitializer | undefined {
    return this.listColumns().find(col => col.name === name)
  }

  findCellDisplayData({ rowId, columnId }: { rowId: uuid; columnId: uuid }): VariableDisplayData | undefined {
    const cell = this.listCells({ rowId, columnId })[0]
    if (!cell) {
      return undefined
    }

    return (cell.data as any).displayData
  }

  toArray(): string[][] {
    const columns: ColumnInitializer[] = this.listColumns()
    const rows: Row[] = this.listRows()

    const result: string[][] = []
    result.push(columns.map(col => col.name))

    rows.forEach(row => {
      const rowData: string[] = []
      columns.forEach(column => {
        const cells = this.listCells({ rowId: row.rowId, columnId: column.columnId })
        rowData.push(cells[0]?.value ?? '')
      })
      result.push(rowData)
    })

    return result
  }

  toRecord(): Array<Record<string, StringResult>> {
    const columns: ColumnInitializer[] = this.listColumns()
    const rows: Row[] = this.listRows()

    const result: Array<Record<string, StringResult>> = []

    rows.forEach(row => {
      const rowData: Record<string, StringResult> = {}
      columns.forEach(column => {
        const cells = this.listCells({ rowId: row.rowId, columnId: column.columnId })
        rowData[column.name] = { type: 'string', result: cells[0]?.value ?? '' }
      })
      result.push(rowData)
    })

    return result
  }
}
