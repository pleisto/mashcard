import { AnyTypeResult } from '../types'

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

export const matchObject = ({ type, result }: AnyTypeResult): any => {
  switch (type) {
    case 'Block':
      return mockBlock(result.name(''), result.id)
    case 'Spreadsheet':
      return mockSpreadsheet(result.name(), result.spreadsheetId)
    case 'Column':
      return mockColumn(result.display(), result.columnId)
    case 'Row':
      return mockRow(result.display())
    case 'Cell':
      return mockCell(result.getValue(), result.cellId, result.columnKey, result.rowKey)
  }

  return result
}
