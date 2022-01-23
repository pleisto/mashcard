import { SpreadsheetColumn } from './useSpreadsheet'

export const columnDisplayTitle = (column: SpreadsheetColumn): string => {
  if (typeof column.title !== 'undefined') {
    return column.title
  } else {
    // TODO: AA for no.27
    return String.fromCharCode(65 + column.sort)
  }
}
