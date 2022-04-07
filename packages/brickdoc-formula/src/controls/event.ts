import { SpreadsheetReloadViaId } from '@brickdoc/schema'
import { EventDependency } from '../types'
import { CellType, ColumnType, RowType, SpreadsheetType } from './types'
import { codeFragments2definition } from '../grammar'

export const spreadsheetRowKey2eventDependency = (spreadsheet: SpreadsheetType, rowKey: string): EventDependency => {
  return {
    kind: 'Row',
    event: SpreadsheetReloadViaId,
    eventId: `${spreadsheet.namespaceId},${spreadsheet.spreadsheetId}`,
    scope: { rows: [rowKey] }
  }
}

export const spreadsheetColumnKey2eventDependency = (
  spreadsheet: SpreadsheetType,
  columnKey: string
): EventDependency => {
  return {
    kind: 'Column',
    event: SpreadsheetReloadViaId,
    eventId: `${spreadsheet.namespaceId},${spreadsheet.spreadsheetId}`,
    scope: { columns: [columnKey] }
  }
}

export const columnRowKey2eventDependency = (column: ColumnType, rowKey: string): EventDependency => {
  return {
    kind: 'Cell',
    event: SpreadsheetReloadViaId,
    eventId: `${column.spreadsheet.namespaceId},${column.spreadsheetId}`,
    scope: { rows: [rowKey], columns: [column.key()] }
  }
}

export const rowColumnKey2eventDependency = (row: RowType, columnKey: string): EventDependency => {
  return {
    kind: 'Cell',
    event: SpreadsheetReloadViaId,
    eventId: `${row.spreadsheet.namespaceId},${row.spreadsheetId}`,
    scope: { rows: [row.key()], columns: [columnKey] }
  }
}

export const spreadsheet2eventDependency = (spreadsheet: SpreadsheetType): EventDependency => {
  return {
    eventId: `${spreadsheet.namespaceId},${spreadsheet.spreadsheetId}`,
    event: SpreadsheetReloadViaId,
    scope: {},
    kind: 'Spreadsheet'
  }
}

export const row2eventDependency = (row: RowType): EventDependency => {
  return spreadsheetRowKey2eventDependency(row.spreadsheet, row.key())
}

export const column2eventDependency = (column: ColumnType): EventDependency => {
  return {
    ...spreadsheetColumnKey2eventDependency(column.spreadsheet, column.key()),
    definitionHandler: (deps, variable, payload) => {
      if (column.logic) return
      const newColumn = column.spreadsheet.listColumns().find(c => c.columnId === column.columnId)
      if (!newColumn) return
      const newCodeFragments = variable.t.codeFragments.map(c => {
        if (c.code !== 'Column') return c
        if (c.attrs.id !== column.columnId) return c
        return { ...c, attrs: { ...c.attrs, name: newColumn.name } }
      })
      return codeFragments2definition(newCodeFragments, variable.t.namespaceId)
    }
  }
}

export const cell2eventDependency = (cell: CellType): EventDependency => {
  return {
    kind: 'Cell',
    event: SpreadsheetReloadViaId,
    eventId: `${cell.spreadsheet.namespaceId},${cell.spreadsheetId}`,
    scope: { rows: [cell.rowKey], columns: [cell.columnKey] }
  }
}
