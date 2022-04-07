import { ColumnId, SpreadsheetId, uuid, VariableDisplayData } from '../types'
import { CellType, SpreadsheetType, Cell } from './types'

export class CellClass implements CellType {
  spreadsheetId: SpreadsheetId
  cellId: uuid
  columnId: ColumnId
  rowId: uuid
  columnIndex: number
  rowIndex: number
  value: string
  displayData: VariableDisplayData | undefined

  spreadsheet: SpreadsheetType
  columnKey: string
  rowKey: string

  constructor(
    spreadsheet: SpreadsheetType,
    { spreadsheetId, cellId, columnId, rowId, columnIndex, rowIndex, value, displayData }: Cell,
    { columnKey, rowKey }: { columnKey: string; rowKey: string }
  ) {
    this.spreadsheetId = spreadsheetId
    this.rowId = rowId
    this.rowIndex = rowIndex
    this.cellId = cellId
    this.value = value
    this.columnId = columnId
    this.columnIndex = columnIndex
    this.displayData = displayData

    this.spreadsheet = spreadsheet

    this.columnKey = columnKey
    this.rowKey = rowKey
  }
}
