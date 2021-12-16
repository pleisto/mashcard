import { Column, Database, DatabaseDefinition, DatabasePersistence, NamespaceId, Row } from '..'

export class DatabaseFactory implements Database {
  blockId: NamespaceId
  dynamic: boolean
  persistence?: DatabasePersistence
  name: () => string
  listColumns: () => Column[]
  listRows: () => Row[]

  constructor({ blockId, name, listColumns, listRows, dynamic }: DatabaseDefinition) {
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

  getColumn(columnId: string): Column | undefined {
    return this.listColumns().find(col => col.columnId === columnId)
  }

  toArray(): string[][] {
    const columns: Column[] = this.listColumns()
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

  toRecord(): Array<{ [key: string]: string }> {
    const columns: Column[] = this.listColumns()
    const rows: Row[] = this.listRows()

    const result: Array<{ [key: string]: string }> = []

    rows.forEach(row => {
      const rowData: { [key: string]: string } = {}
      columns.forEach(col => {
        rowData[col.name] = row[col.columnId] || ''
      })
      result.push(rowData)
    })

    return result
  }
}
