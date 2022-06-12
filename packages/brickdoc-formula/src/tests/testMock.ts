import { CellClass, ColumnClass, RowClass, SpreadsheetClass } from '../controls'
import { BlockClass } from '../controls/block'

const BLOCK_SNAPSHOT_NAME = 'BLOCK_SNAPSHOT'
const COLUMN_SNAPSHOT_NAME = 'COLUMN_SNAPSHOT'
const ROW_SNAPSHOT_NAME = 'ROW_SNAPSHOT'
const CELL_SNAPSHOT_NAME = 'CELL_SNAPSHOT'
const SPREADSHEET_SNAPSHOT_NAME = 'SPREADSHEET_SNAPSHOT'

export const mockBlock = (name: string, namespaceId: string): any => [BLOCK_SNAPSHOT_NAME, name, namespaceId]
export const mockSpreadsheet = (name: string, namespaceId: string): any => [
  SPREADSHEET_SNAPSHOT_NAME,
  name,
  namespaceId
]
export const mockColumn = (display: string, columnId: string): any => [COLUMN_SNAPSHOT_NAME, display, columnId]
export const mockRow = (display: string): any => [ROW_SNAPSHOT_NAME, display]
export const mockCell = (value: string, cellId: string, columnKey: string, rowKey: string): any => [
  CELL_SNAPSHOT_NAME,
  value,
  cellId,
  columnKey,
  rowKey
]

export const matchObject = (obj: any): any => {
  if (obj instanceof BlockClass) return mockBlock(obj.name(''), obj.id)
  if (obj instanceof SpreadsheetClass) return mockSpreadsheet(obj.name(), obj.spreadsheetId)
  if (obj instanceof ColumnClass) return mockColumn(obj.display(), obj.columnId)
  if (obj instanceof RowClass) return mockRow(obj.display())
  if (obj instanceof CellClass) return mockCell(obj.value, obj.cellId, obj.columnKey, obj.rowKey)

  return obj
}
