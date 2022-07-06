import { SpreadsheetReloadViaId, SpreadsheetUpdateNamePayload } from '../events'
import { ColumnId, EventDependency, NamespaceId, SpreadsheetId, uuid } from '../type'
import { CellType, SpreadsheetType, Cell } from './types'

export class CellClass implements CellType {
  namespaceId: NamespaceId
  spreadsheetId: SpreadsheetId
  cellId: uuid
  columnId: ColumnId
  rowId: uuid
  variableId: uuid
  columnIndex: number
  rowIndex: number
  value: string
  spreadsheet: SpreadsheetType
  columnKey: string
  rowKey: string
  cleanupEventDependency: EventDependency<SpreadsheetUpdateNamePayload>

  constructor(
    spreadsheet: SpreadsheetType,
    { namespaceId, spreadsheetId, cellId, columnId, rowId, columnIndex, rowIndex, value, variableId }: Cell,
    {
      columnKey,
      rowKey,
      cleanupEventDependency
    }: { columnKey: string; rowKey: string; cleanupEventDependency: EventDependency<SpreadsheetUpdateNamePayload> }
  ) {
    this.namespaceId = namespaceId
    this.spreadsheetId = spreadsheetId
    this.variableId = variableId
    this.rowId = rowId
    this.rowIndex = rowIndex
    this.cellId = cellId
    this.value = value
    this.columnId = columnId
    this.columnIndex = columnIndex
    this.spreadsheet = spreadsheet

    this.columnKey = columnKey
    this.rowKey = rowKey
    this.cleanupEventDependency = cleanupEventDependency
  }

  getValue(): string {
    const displayData = this.spreadsheet.findCellDisplayData({ rowId: this.rowId, columnId: this.columnId })
    if (displayData) {
      return displayData.display
    }
    return this.value
  }

  eventDependency(): EventDependency<SpreadsheetUpdateNamePayload> {
    return {
      kind: 'Cell',
      event: SpreadsheetReloadViaId,
      key: `${this.cleanupEventDependency.kind}#Cell#${this.spreadsheetId}#${this.columnKey}#${this.rowKey}`,
      eventId: `${this.namespaceId},${this.spreadsheetId}`,
      scope: { rows: [this.rowKey], columns: [this.columnKey] },
      cleanup: this.cleanupEventDependency
    }
  }
}
