import { SpreadsheetColumn } from './useSpreadsheet'

export const columnDisplayIndex = (index: number): string => {
  const r = index % 26
  const l = Math.floor(index / 26)
  return `${l > 0 ? columnDisplayIndex(l - 1) : ''}${String.fromCharCode(65 + r)}`
}

export const columnDisplayTitle = (column: SpreadsheetColumn): string => {
  if (typeof column.title !== 'undefined') {
    return column.title
  } else {
    return columnDisplayIndex(column.sort)
  }
}
