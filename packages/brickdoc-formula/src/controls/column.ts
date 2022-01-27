import { ColumnType, ColumnInitializer, SpreadsheetType, Cell } from './types'
import { ColumnId, ColumnName, NamespaceId } from '../types'

export class ColumnClass implements ColumnType {
  columnId: ColumnId
  name: ColumnName
  namespaceId: NamespaceId
  index: number
  spreadsheet: SpreadsheetType

  constructor(spreadsheet: SpreadsheetType, { columnId, namespaceId, name, index }: ColumnInitializer) {
    this.columnId = columnId
    this.namespaceId = namespaceId
    this.name = name
    this.index = index
    this.spreadsheet = spreadsheet
  }

  cells(): Cell[] {
    return this.spreadsheet.listCells({ columnId: this.columnId })
  }

  persistence(): ColumnInitializer {
    return {
      columnId: this.columnId,
      namespaceId: this.namespaceId,
      name: this.name,
      index: this.index
    }
  }
}
