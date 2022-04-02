import {
  BrickdocEventBus,
  EventSubscribed,
  SpreadsheetReloadViaId,
  SpreadsheetUpdateColumnsViaId,
  SpreadsheetUpdateNameViaId,
  SpreadsheetUpdateRowsViaId
} from '@brickdoc/schema'
import {
  CodeFragmentVisitor,
  column2codeFragment,
  maybeEncodeString,
  objectDiff,
  codeFragments2definition
} from '../grammar'
import {
  AnyTypeResult,
  CodeFragment,
  ContextInterface,
  ErrorMessage,
  NameDependencyWithKind,
  NamespaceId,
  StringResult,
  uuid,
  VariableDisplayData
} from '../types'
import { ColumnClass } from './column'
import {
  SpreadsheetType,
  SpreadsheetInitializer,
  SpreadsheetDynamicPersistence,
  Row,
  ColumnInitializer,
  CellType,
  SpreadsheetAllPersistence,
  handleCodeFragmentsResult,
  ColumnType
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
  }) => CellType

  _columns: ColumnInitializer[]
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
          return v.t.name
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

    const nameSubscription = BrickdocEventBus.subscribe(
      SpreadsheetUpdateNameViaId,
      e => {
        this._name = e.payload.name
        this._formulaContext.setName(this.nameDependency())
      },
      { eventId: `${namespaceId},${spreadsheetId}`, subscribeId: `Spreadsheet#${spreadsheetId}` }
    )
    this.eventListeners.push(nameSubscription)

    const columnsSubcription = BrickdocEventBus.subscribe(
      SpreadsheetUpdateColumnsViaId,
      e => {
        const oldColumns = this._columns
        const newColumns = e.payload.columns
        this._columns = newColumns

        const pairs1 = objectDiff<ColumnInitializer>(oldColumns, newColumns)
        const pairs2 = objectDiff<ColumnInitializer>(newColumns, oldColumns)
        const changedColumnIds = [
          ...new Set([...Object.values(pairs1), ...Object.values(pairs2)].flatMap(p => [p.columnId, p.displayIndex]))
        ]
        if (!changedColumnIds.length) return

        BrickdocEventBus.dispatch(
          SpreadsheetReloadViaId({
            spreadsheetId: this.spreadsheetId,
            scopes: [{ kind: 'Column', keys: changedColumnIds }],
            namespaceId: this.namespaceId,
            key: this.spreadsheetId
          })
        )
      },
      { eventId: `${namespaceId},${spreadsheetId}`, subscribeId: `Spreadsheet#${spreadsheetId}` }
    )
    this.eventListeners.push(columnsSubcription)

    const rowsSubcription = BrickdocEventBus.subscribe(
      SpreadsheetUpdateRowsViaId,
      e => {
        const oldRows = this._rows
        const newRows = e.payload.rows
        this._rows = newRows

        const pairs1 = objectDiff<Row>(oldRows, newRows)
        const pairs2 = objectDiff<Row>(newRows, oldRows)
        const changedRowIds = [...new Set([...Object.values(pairs1), ...Object.values(pairs2)].map(p => p.rowId))]
        if (!changedRowIds.length) return

        BrickdocEventBus.dispatch(
          SpreadsheetReloadViaId({
            spreadsheetId: this.spreadsheetId,
            scopes: [{ kind: 'Row', keys: changedRowIds }],
            namespaceId: this.namespaceId,
            key: this.spreadsheetId
          })
        )
      },
      { eventId: `${namespaceId},${spreadsheetId}`, subscribeId: `Spreadsheet#${spreadsheetId}` }
    )
    this.eventListeners.push(rowsSubcription)
  }

  public listColumns(): ColumnInitializer[] {
    return this._columns
  }

  public listRows(): Row[] {
    return this._rows
  }

  public listCells({ rowId, columnId }: { rowId?: uuid; columnId?: uuid }): CellType[] {
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

  public cleanup(hard: boolean): void {
    if (hard) this._formulaContext.removeName(this.spreadsheetId)
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

  async handleInterpret(name: string): Promise<AnyTypeResult> {
    const number = Number(name)
    if (!isNaN(number)) {
      return this.handleInterpretRow(number)
    }
    return this.handleInterpretColumn(name)
  }

  private handleInterpretColumn(name: string): AnyTypeResult {
    const column = this.getColumnByName(name)

    if (column) {
      return { type: 'Column', result: column }
    }

    return { type: 'Error', result: `Column ${name} not found`, errorKind: 'runtime' }
  }

  private handleInterpretRow(number: number): AnyTypeResult {
    const row = this.listRows()[number]
    if (!row) {
      return { type: 'Error', result: `Row ${number} not found`, errorKind: 'runtime' }
    }
    const cells: CellType[] = this.listCells({ rowId: row.rowId })

    return { type: 'Row', result: { ...row, cells } }
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
    const errors: ErrorMessage[] = []
    const row = this.listRows()[number]

    if (!row) {
      errors.push({ type: 'deps', message: `Row "${number}" not found` })
      return {
        errors,
        firstArgumentType: undefined,
        codeFragments
      }
    }

    const firstArgumentType = 'Row'
    const finalRhsCodeFragments = codeFragments
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
    const column = this._formulaContext.findColumnByName(this.spreadsheetId, name)

    if (!column) {
      errors.push({ type: 'deps', message: `Column "${name}" not found` })
      return {
        errors,
        firstArgumentType: undefined,
        codeFragments
      }
    }

    const firstArgumentType = 'Column'
    let finalRhsCodeFragments = codeFragments

    if (['StringLiteral', 'FunctionName'].includes(codeFragments[0].code)) {
      finalRhsCodeFragments = [column2codeFragment(column, visitor.ctx.meta.namespaceId)]
    }

    const spreadsheetEventDependency = visitor.eventDependencies
      .reverse()
      .find(
        d =>
          !(
            d.kind === 'Spreadsheet' &&
            d.event === SpreadsheetReloadViaId &&
            d.eventId === `${this.namespaceId},${this.spreadsheetId}`
          )
      )

    if (spreadsheetEventDependency) {
      spreadsheetEventDependency.kind = 'Column'
      spreadsheetEventDependency.scopes = [
        { keys: [column.logic ? column.displayIndex : column.columnId], kind: 'Column' }
      ]
      spreadsheetEventDependency.definitionHandler = (deps, variable, payload) => {
        if (column.logic) return
        const newColumn = this._columns.find(c => c.columnId === column.columnId)
        if (!newColumn) return
        const newCodeFragments = variable.t.codeFragments.map(c => {
          if (c.code !== 'Column') return c
          if (c.attrs.id !== column.columnId) return c
          return { ...c, attrs: { ...c.attrs, name: newColumn.name } }
        })
        return codeFragments2definition(newCodeFragments, variable.t.namespaceId)
      }
    } else {
      console.error('spreadsheetEventDependency column not found')
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

  getRow(rowId: string): Row | undefined {
    return this.listRows().find(row => row.rowId === rowId)
  }

  getColumnById(columnId: string): ColumnType | undefined {
    const column = this.listColumns().find(col => col.columnId === columnId)
    if (column) return new ColumnClass(this, column, false)
    return undefined
  }

  getColumnByName(name: string): ColumnType | undefined {
    const column = this._columns.find(col => col.title === name)

    if (column) return new ColumnClass(this, column, false)

    const logicColumn = this._columns.find(col => col.displayIndex === name)
    if (logicColumn) return new ColumnClass(this, logicColumn, true)

    return undefined
  }

  findCellValue({ rowId, columnId }: { rowId: uuid; columnId: uuid }): string | undefined {
    const cell = this.listCells({ rowId, columnId })[0]
    if (!cell) {
      return undefined
    }

    return cell.displayData?.display ?? cell.value
  }

  findCellDisplayData({ rowId, columnId }: { rowId: uuid; columnId: uuid }): VariableDisplayData | undefined {
    const cell = this.listCells({ rowId, columnId })[0]
    if (!cell) {
      return undefined
    }

    return cell.displayData
  }

  toArray(): string[][] {
    const columns: ColumnInitializer[] = this.listColumns()
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

  toRecord(): Array<Record<string, StringResult>> {
    const columns: ColumnInitializer[] = this.listColumns()
    const rows: Row[] = this.listRows()

    const result: Array<Record<string, StringResult>> = []

    rows.forEach(row => {
      const rowData: Record<string, StringResult> = {}
      columns.forEach(column => {
        const cells = this.listCells({ rowId: row.rowId, columnId: column.columnId })
        rowData[column.name] = { type: 'string', result: cells[0]?.value ?? '' }
      })
      result.push(rowData)
    })

    return result
  }
}
