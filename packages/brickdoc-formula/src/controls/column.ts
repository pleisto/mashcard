import { ColumnType, ColumnInitializer, SpreadsheetType } from './types'
import { ColumnId, ColumnName, NamespaceId } from '../types'

export class ColumnClass implements ColumnType {
  columnId: ColumnId
  name: ColumnName
  namespaceId: NamespaceId
  index: number
  type: string
  rows: string[]
  spreadsheet: SpreadsheetType

  constructor(spreadsheet: SpreadsheetType, { columnId, namespaceId, name, index, type, rows }: ColumnInitializer) {
    this.columnId = columnId
    this.namespaceId = namespaceId
    this.name = name
    this.index = index
    this.type = type
    this.rows = rows
    this.spreadsheet = spreadsheet
  }

  persistence(): ColumnInitializer {
    return {
      columnId: this.columnId,
      namespaceId: this.namespaceId,
      name: this.name,
      index: this.index,
      type: this.type,
      rows: this.rows
    }
  }
}
