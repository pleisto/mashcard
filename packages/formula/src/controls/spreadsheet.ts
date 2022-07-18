import { MashcardEventBus, EventSubscribed } from '@mashcard/schema'
import {
  SpreadsheetReloadViaId,
  SpreadsheetUpdateColumnsViaId,
  SpreadsheetUpdateNameViaId,
  SpreadsheetUpdateNamePayload,
  SpreadsheetUpdateRowsViaId,
  FormulaSpreadsheetDeleted
} from '../events'
import {
  CodeFragmentVisitor,
  column2codeFragment,
  maybeEncodeString,
  objectDiff,
  row2codeFragment,
  isKey,
  FormulaInterpreter
} from '../grammar'
import { display } from '../context'
import { parseTrackColumn } from '../grammar/dependency'
import {
  AnyTypeResult,
  CodeFragment,
  ContextInterface,
  ErrorMessage,
  EventDependency,
  FindKey,
  NameDependencyWithKind,
  NamespaceId,
  uuid,
  VariableDisplayData
} from '../type'
import { ColumnClass } from './column'
import { RowClass } from './row'
import {
  SpreadsheetType,
  SpreadsheetInitializer,
  SpreadsheetDynamicPersistence,
  Row,
  Column,
  Cell,
  SpreadsheetAllPersistence,
  handleCodeFragmentsResult,
  ColumnType,
  RowType,
  getEventDependencyInput
} from './types'

export class SpreadsheetClass implements SpreadsheetType {
  _formulaContext: ContextInterface
  spreadsheetId: NamespaceId
  namespaceId: NamespaceId
  dynamic: boolean
  persistence?: SpreadsheetDynamicPersistence
  _name: string
  name: () => string
  getCell: ({
    rowId,
    columnId,
    rowIndex,
    columnIndex
  }: {
    rowId: uuid
    columnId: uuid
    rowIndex: number
    columnIndex: number
  }) => Cell

  _columns: Column[]
  _rows: Row[]
  eventListeners: EventSubscribed[] = []

  constructor({
    spreadsheetId,
    namespaceId,
    name,
    columns,
    rows,
    getCell,
    dynamic,
    ctx: { meta, formulaContext }
  }: SpreadsheetInitializer) {
    this._formulaContext = formulaContext
    this.dynamic = dynamic
    this.spreadsheetId = spreadsheetId
    this.namespaceId = namespaceId
    this.getCell = getCell
    this._name = name
    if (meta) {
      this.name = () => {
        const v = formulaContext.findVariableById(meta.namespaceId, meta.variableId)
        if (v) {
          return v.t.meta.name
        }
        return this._name
      }
    } else {
      this.name = () => this._name
    }
    this._columns = columns
    this._rows = rows

    if (dynamic) {
      this.persistence = this.persistDynamic()
    }

    const nameSubscription = MashcardEventBus.subscribe(
      SpreadsheetUpdateNameViaId,
      async e => {
        this._name = e.payload.meta
        await this._formulaContext.setName(this.nameDependency())
      },
      {
        eventId: `${this._formulaContext.domain}#${namespaceId},${spreadsheetId}`,
        subscribeId: `Spreadsheet#${spreadsheetId}`
      }
    )
    this.eventListeners.push(nameSubscription)

    const spreadsheetDeleteSubcription = MashcardEventBus.subscribe(
      FormulaSpreadsheetDeleted,
      async e => {
        await this._formulaContext.removeSpreadsheet(spreadsheetId)
      },
      { eventId: `${this._formulaContext.domain}#${spreadsheetId}`, subscribeId: `Spreadsheet#${spreadsheetId}` }
    )

    this.eventListeners.push(spreadsheetDeleteSubcription)

    const columnsSubcription = MashcardEventBus.subscribe(
      SpreadsheetUpdateColumnsViaId,
      async e => {
        const oldColumns = this._columns
        const newColumns = e.payload.columns
        this._columns = newColumns

        const pairs1 = objectDiff<Column>(oldColumns, newColumns)
        const pairs2 = objectDiff<Column>(newColumns, oldColumns)
        const changedColumnIds = [
          ...new Set([...Object.values(pairs1), ...Object.values(pairs2)].flatMap(p => [p.columnId, p.displayIndex]))
        ]
        if (!changedColumnIds.length) return

        const result = MashcardEventBus.dispatch(
          SpreadsheetReloadViaId({
            id: this.spreadsheetId,
            username: this._formulaContext.domain,
            scope: { columns: changedColumnIds },
            namespaceId: this.namespaceId,
            key: this.spreadsheetId,
            meta: null
          })
        )
        await Promise.all(result)
      },
      {
        eventId: `${this._formulaContext.domain}#${namespaceId},${spreadsheetId}`,
        subscribeId: `Spreadsheet#${spreadsheetId}`
      }
    )
    this.eventListeners.push(columnsSubcription)

    const rowsSubcription = MashcardEventBus.subscribe(
      SpreadsheetUpdateRowsViaId,
      async e => {
        const oldRows = this._rows
        const newRows = e.payload.rows
        this._rows = newRows

        const pairs1 = objectDiff<Row>(oldRows, newRows)
        const pairs2 = objectDiff<Row>(newRows, oldRows)
        const changedRowIds = [
          ...new Set(
            [...Object.values(pairs1), ...Object.values(pairs2)].flatMap((p: Row) => [p.rowId, String(p.rowIndex + 1)])
          )
        ]
        if (!changedRowIds.length) return

        const result = MashcardEventBus.dispatch(
          SpreadsheetReloadViaId({
            id: this.spreadsheetId,
            username: this._formulaContext.domain,
            scope: { rows: changedRowIds },
            namespaceId: this.namespaceId,
            key: this.spreadsheetId,
            meta: null
          })
        )
        await Promise.all(result)
      },
      {
        eventId: `${this._formulaContext.domain}#${namespaceId},${spreadsheetId}`,
        subscribeId: `Spreadsheet#${spreadsheetId}`
      }
    )
    this.eventListeners.push(rowsSubcription)
  }

  public namespaceName(pageId: NamespaceId): string {
    const block = this._formulaContext.findBlockById(this.namespaceId)
    if (block) {
      return block.name(pageId)
    }

    return 'UnknownPage'
  }

  public listColumns(): Column[] {
    return this._columns
  }

  public listRows(): Row[] {
    return this._rows
  }

  public listCells({ rowId, columnId }: { rowId?: uuid; columnId?: uuid }): Cell[] {
    const finalRowIdsWithIndex = rowId ? this._rows.filter(row => row.rowId === rowId) : this._rows
    const finalColumnIdsWithIndex = columnId
      ? this._columns.filter(column => column.columnId === columnId)
      : this._columns

    return finalRowIdsWithIndex.flatMap(({ rowId, rowIndex }) =>
      finalColumnIdsWithIndex.map(({ columnId, index: columnIndex }) => {
        return this.getCell({ rowId, columnId, rowIndex, columnIndex })
      })
    )
  }

  public cleanup(): void {
    this.eventListeners.forEach(listener => {
      listener.unsubscribe()
    })
    this.eventListeners = []
  }

  public nameDependency(): NameDependencyWithKind {
    const nameToken = { image: maybeEncodeString(this._name)[1], type: 'StringLiteral' }
    return {
      kind: 'Spreadsheet',
      id: this.spreadsheetId,
      namespaceId: this.namespaceId,
      name: this._name,
      renderTokens: (namespaceIsExist, pageId) => {
        if (namespaceIsExist) {
          return [nameToken]
        }

        const namespaceToken =
          pageId === this.namespaceId
            ? { image: 'CurrentBlock', type: 'CurrentBlock' }
            : { image: this.namespaceId, type: 'UUID' }

        return [{ image: '#', type: 'Sharp' }, namespaceToken, { image: '.', type: 'Dot' }, nameToken]
      }
    }
  }

  async handleInterpret(interpreter: FormulaInterpreter, name: string): Promise<AnyTypeResult> {
    const number = Number(name)
    if (!isNaN(number)) {
      return this.handleInterpretRow(number)
    }
    return this.handleInterpretColumn(interpreter, name)
  }

  private handleInterpretColumn(interpreter: FormulaInterpreter, name: string): AnyTypeResult {
    const column = this.findColumn({ namespaceId: this.namespaceId, type: 'name', value: name })

    if (!column) return { type: 'Error', result: { message: `Column ${name} not found`, type: 'runtime' } }

    return { type: 'Column', result: column }
  }

  eventDependency({ rowKey, columnKey }: getEventDependencyInput): EventDependency<SpreadsheetUpdateNamePayload> {
    if (rowKey) {
      return {
        kind: 'Row',
        event: SpreadsheetReloadViaId,
        key: `Spreadsheet#Row#${this.spreadsheetId}#${rowKey}`,
        eventId: `${this.namespaceId},${this.spreadsheetId}`,
        scope: { rows: [rowKey] },
        cleanup: this.eventDependency({})
      }
    }
    if (columnKey) {
      return {
        kind: 'Column',
        event: SpreadsheetReloadViaId,
        key: `Spreadsheet#Column#${this.spreadsheetId}#${columnKey}`,
        eventId: `${this.namespaceId},${this.spreadsheetId}`,
        scope: { columns: [columnKey] },
        cleanup: this.eventDependency({})
      }
    }
    return {
      eventId: `${this.namespaceId},${this.spreadsheetId}`,
      event: SpreadsheetReloadViaId,
      key: `Spreadsheet#${this.spreadsheetId}`,
      scope: {},
      kind: 'Spreadsheet'
    }
  }

  private handleInterpretRow(number: number): AnyTypeResult {
    const row = this.findRow({ namespaceId: this.namespaceId, type: 'name', value: String(number) })
    if (!row) {
      return { type: 'Error', result: { message: `Row ${number} not found`, type: 'runtime' } }
    }

    return { type: 'Row', result: row }
  }

  public handleCodeFragments(
    visitor: CodeFragmentVisitor,
    name: string,
    codeFragments: CodeFragment[]
  ): handleCodeFragmentsResult {
    const number = Number(name)
    if (!isNaN(number)) {
      return this.handleCodeFragmentsRow(visitor, number, codeFragments)
    }
    return this.handleCodeFragmentsColumn(visitor, name, codeFragments)
  }

  private handleCodeFragmentsRow(
    visitor: CodeFragmentVisitor,
    number: number,
    codeFragments: CodeFragment[]
  ): handleCodeFragmentsResult {
    visitor.eventDependencies.push(this.eventDependency({ rowKey: String(number) }))

    const errors: ErrorMessage[] = []
    const row = this.findRow({ namespaceId: this.namespaceId, type: 'name', value: String(number) })
    if (!row) {
      errors.push({ type: 'deps', message: `Row "${number}" not found` })
      return {
        errors,
        firstArgumentType: undefined,
        codeFragments
      }
    }

    const firstArgumentType = 'Row'
    let finalRhsCodeFragments = codeFragments
    if (isKey(codeFragments[0])) {
      finalRhsCodeFragments = [row2codeFragment(row, visitor.ctx.meta.namespaceId)]
    }
    return {
      errors,
      firstArgumentType,
      codeFragments: finalRhsCodeFragments
    }
  }

  private handleCodeFragmentsColumn(
    visitor: CodeFragmentVisitor,
    name: string,
    codeFragments: CodeFragment[]
  ): handleCodeFragmentsResult {
    const errors: ErrorMessage[] = []
    const column = this.findColumn({ namespaceId: this.namespaceId, type: 'name', value: name })

    if (!column) {
      visitor.eventDependencies.push(this.eventDependency({ columnKey: name }))
      errors.push({ type: 'deps', message: `Column "${name}" not found` })
      return {
        errors,
        firstArgumentType: undefined,
        codeFragments
      }
    }
    parseTrackColumn(visitor, column)

    const firstArgumentType = 'Column'
    let finalRhsCodeFragments = codeFragments

    if (isKey(codeFragments[0])) {
      finalRhsCodeFragments = [column2codeFragment(column, visitor.ctx.meta.namespaceId)]
    }

    return {
      errors,
      firstArgumentType,
      codeFragments: finalRhsCodeFragments
    }
  }

  persistDynamic(): SpreadsheetDynamicPersistence {
    return {
      spreadsheetId: this.spreadsheetId,
      namespaceId: this.namespaceId,
      spreadsheetName: this.name(),
      columns: this.listColumns(),
      rows: this.listRows(),
      cells: this.listCells({})
    }
  }

  persistAll(): SpreadsheetAllPersistence {
    return {
      spreadsheetId: this.spreadsheetId,
      namespaceId: this.namespaceId,
      rowCount: this.columnCount(),
      columnCount: this.columnCount(),
      persistence: this.persistence
    }
  }

  columnCount(): number {
    return this.listColumns().length
  }

  rowCount(): number {
    return this.listRows().length
  }

  findRow(key: FindKey): RowType | undefined {
    if (key.type === 'id') {
      const row = this.listRows().find(row => row.rowId === key.value)
      if (!row) return undefined
      return new RowClass(this, row, false, key)
    } else {
      const row = this.listRows()[Number(key.value) - 1]
      if (!row) return undefined
      return new RowClass(this, row, true, key)
    }
  }

  findColumn(key: FindKey): ColumnType | undefined {
    if (key.type === 'id') {
      const column = this.listColumns().find(col => col.columnId === key.value)
      if (!column) return undefined
      return new ColumnClass(this, column, false, key)
    } else {
      const column = this._columns.find(col => col.title?.toUpperCase() === key.value.toUpperCase())

      if (column) return new ColumnClass(this, column, false, key)

      const logicColumn = this._columns.find(col => col.displayIndex === key.value)
      if (logicColumn) return new ColumnClass(this, logicColumn, true, key)

      return undefined
    }
  }

  findCellValue({ rowId, columnId }: { rowId: uuid; columnId: uuid }): string | undefined {
    const cell = this.listCells({ rowId, columnId })[0]
    if (!cell) {
      return undefined
    }

    const displayData = this._formulaContext.findVariableDisplayDataById(this.namespaceId, cell.variableId)
    if (displayData) return display(displayData.result).result

    return cell.value
  }

  findCellDisplayData({ rowId, columnId }: { rowId: uuid; columnId: uuid }): VariableDisplayData | undefined {
    const cell = this.listCells({ rowId, columnId })[0]
    if (!cell) {
      return undefined
    }

    return this._formulaContext.findVariableDisplayDataById(this.namespaceId, cell.variableId)
  }

  toArray(): string[][] {
    const columns: Column[] = this.listColumns()
    const rows: Row[] = this.listRows()

    const result: string[][] = []
    result.push(columns.map(col => col.name))

    rows.forEach(row => {
      const rowData: string[] = []
      columns.forEach(column => {
        const cells = this.listCells({ rowId: row.rowId, columnId: column.columnId })
        rowData.push(cells[0]?.value ?? '')
      })
      result.push(rowData)
    })

    return result
  }

  toRecord(): Array<Record<string, AnyTypeResult<'string'>>> {
    const columns: Column[] = this.listColumns()
    const rows: Row[] = this.listRows()

    const result: Array<Record<string, AnyTypeResult<'string'>>> = []

    rows.forEach(row => {
      const rowData: Record<string, AnyTypeResult<'string'>> = {}
      columns.forEach(column => {
        const cells = this.listCells({ rowId: row.rowId, columnId: column.columnId })
        rowData[column.name] = { type: 'string', result: cells[0]?.value ?? '' }
      })
      result.push(rowData)
    })

    return result
  }
}
