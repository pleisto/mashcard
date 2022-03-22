import { CodeFragmentVisitor, column2attrs, columnRenderText } from '../grammar'
import {
  AnyTypeResult,
  CodeFragment,
  ContextInterface,
  ErrorMessage,
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
  handleCodeFragmentsResult
} from './types'

export class SpreadsheetClass implements SpreadsheetType {
  _formulaContext: ContextInterface
  blockId: NamespaceId
  dynamic: boolean
  persistence?: SpreadsheetDynamicPersistence
  name: () => string
  listColumns: () => ColumnInitializer[]
  listRows: () => Row[]
  listCells: ({ rowId, columnId }: { rowId?: uuid; columnId?: uuid }) => CellType[]

  constructor({
    blockId,
    name,
    listColumns,
    listRows,
    listCells,
    dynamic,
    ctx: { meta, formulaContext }
  }: SpreadsheetInitializer) {
    this._formulaContext = formulaContext
    this.dynamic = dynamic
    this.blockId = blockId
    if (meta) {
      this.name = () => {
        const v = formulaContext.findVariableById(meta.namespaceId, meta.variableId)
        if (v) {
          return v.t.name
        }
        return name
      }
    } else {
      this.name = () => name
    }
    this.listColumns = listColumns
    this.listRows = listRows
    this.listCells = listCells

    if (dynamic) {
      this.persistence = this.persistDynamic()
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
      return { type: 'Column', result: new ColumnClass(this, column) }
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

  handleCodeFragments(
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
    const column = this._formulaContext.findColumnByName(this.blockId, name)

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
      finalRhsCodeFragments = [
        {
          ...codeFragments[0],
          display: name,
          code: 'Column',
          attrs: column2attrs(column),
          renderText: columnRenderText(column)
        }
      ]
    }

    return {
      errors,
      firstArgumentType,
      codeFragments: finalRhsCodeFragments
    }
  }

  persistDynamic(): SpreadsheetDynamicPersistence {
    return {
      blockId: this.blockId,
      spreadsheetName: this.name(),
      columns: this.listColumns(),
      rows: this.listRows(),
      cells: this.listCells({})
    }
  }

  persistAll(): SpreadsheetAllPersistence {
    return {
      blockId: this.blockId,
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

  getColumnById(columnId: string): ColumnInitializer | undefined {
    return this.listColumns().find(col => col.columnId === columnId)
  }

  getColumnByName(name: string): ColumnInitializer | undefined {
    return this.listColumns().find(col => col.name === name)
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
