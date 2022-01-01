import { NamespaceId, StringResult } from '../types'
import { DatabaseType, DatabaseInitializer, DatabasePersistence, Row, ColumnInitializer } from './types'

export class DatabaseClass implements DatabaseType {
  blockId: NamespaceId
  dynamic: boolean
  persistence?: DatabasePersistence
  name: () => string
  listColumns: () => ColumnInitializer[]
  listRows: () => Row[]

  constructor({ blockId, name, listColumns, listRows, dynamic }: DatabaseInitializer) {
    this.dynamic = dynamic
    this.blockId = blockId
    this.name = name
    this.listColumns = listColumns
    this.listRows = listRows

    if (dynamic) {
      this.persistence = this.persist()
    }
  }

  persist(): DatabasePersistence {
    return {
      blockId: this.blockId,
      tableName: this.name(),
      columns: this.listColumns(),
      rows: this.listRows()
    }
  }

  columnCount(): number {
    return this.listColumns().length
  }

  rowCount(): number {
    return this.listRows().length
  }

  getRow(rowId: string): Row | undefined {
    return this.listRows().find(row => row.id === rowId)
  }

  getColumn(columnId: string): ColumnInitializer | undefined {
    return this.listColumns().find(col => col.columnId === columnId)
  }

  toArray(): string[][] {
    const columns: ColumnInitializer[] = this.listColumns()
    const rows: Row[] = this.listRows()

    const result: string[][] = []
    result.push(columns.map(col => col.name))

    rows.forEach(row => {
      const rowData: string[] = []
      columns.forEach(col => {
        rowData.push(row[col.columnId] || '')
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
      columns.forEach(col => {
        rowData[col.name] = { type: 'string', result: row[col.columnId] || '' }
      })
      result.push(rowData)
    })

    return result
  }
}
