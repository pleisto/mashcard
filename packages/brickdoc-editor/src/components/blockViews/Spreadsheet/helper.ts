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

export const parsePasteTable = (str: string): string[][] => {
  const matrix: string[][] = [[]]
  let curRow = matrix[0]
  str.replace(
    /(?:'([^'\\]*(?:\\[\S\s][^'\\]*)*)'|"([^"\\]*(?:\\[\S\s][^"\\]*)*)"|([^'"\s]+))\t?(\n)?/g,
    (m, g1, g2, g3, g4) => {
      if (g1 !== undefined) {
        curRow.push(g1.replace(/\\'/g, "'"))
      }
      if (g2 !== undefined) {
        curRow.push(g2.replace(/\\"/g, '"'))
      }
      if (g3 !== undefined) {
        curRow.push(g3)
      }
      if (g4 === '\n') {
        curRow = []
        matrix.push(curRow)
      }
      return m
    }
  )
  return matrix
}
