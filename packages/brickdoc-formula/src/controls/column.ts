import { ColumnType, ColumnInitializer, SpreadsheetType, CellType } from './types'
import {
  AnyTypeResult,
  CellResult,
  CodeFragment,
  ColumnId,
  ColumnName,
  ErrorMessage,
  ErrorResult,
  FormulaType,
  NamespaceId
} from '../types'
import { CodeFragmentVisitor } from '../grammar'
import { SpreadsheetReloadViaId } from '@brickdoc/schema'

export class ColumnClass implements ColumnType {
  columnId: ColumnId
  name: ColumnName
  spreadsheetId: NamespaceId
  index: number
  sort: number
  title: string | undefined
  displayIndex: string
  spreadsheet: SpreadsheetType
  logic: boolean

  constructor(
    spreadsheet: SpreadsheetType,
    { columnId, spreadsheetId: namespaceId, name, index, sort, displayIndex, title }: ColumnInitializer,
    logic: boolean
  ) {
    this.sort = sort
    this.title = title
    this.displayIndex = displayIndex
    this.columnId = columnId
    this.spreadsheetId = namespaceId
    this.name = name
    this.index = index
    this.logic = logic
    this.spreadsheet = spreadsheet
  }

  display(): string {
    return this.logic ? this.displayIndex : this.name
  }

  cells(): CellType[] {
    return this.spreadsheet.listCells({ columnId: this.columnId })
  }

  persistence(): ColumnInitializer {
    return {
      title: this.title,
      displayIndex: this.displayIndex,
      sort: this.sort,
      columnId: this.columnId,
      spreadsheetId: this.spreadsheetId,
      name: this.name,
      index: this.index
    }
  }

  private findCellByNumber(name: string): CellResult | ErrorResult {
    const number = Number(name)
    if (isNaN(number)) {
      return { type: 'Error', result: `Need a number: ${name}`, errorKind: 'syntax' }
    }
    const cells = this.cells()

    if (number > cells.length) {
      return { type: 'Error', result: `Cell out of range: ${cells.length}`, errorKind: 'runtime' }
    }

    return { type: 'Cell', result: cells[number - 1] }
  }

  async handleInterpret(name: string): Promise<AnyTypeResult> {
    return this.findCellByNumber(name)
  }

  handleCodeFragments(
    visitor: CodeFragmentVisitor,
    name: string,
    codeFragments: CodeFragment[]
  ): { errors: ErrorMessage[]; firstArgumentType: FormulaType | undefined; codeFragments: CodeFragment[] } {
    const cell = this.findCellByNumber(name)
    const errors: ErrorMessage[] = []

    if (cell.type === 'Error') {
      errors.push({ type: cell.errorKind, message: cell.result })
      return {
        errors,
        firstArgumentType: undefined,
        codeFragments
      }
    }

    const spreadsheetEventDependency = visitor.eventDependencies
      .reverse()
      .find(
        d =>
          !(
            d.kind === 'Column' &&
            d.event === SpreadsheetReloadViaId &&
            d.eventId === `${this.spreadsheet.namespaceId},${this.spreadsheetId}`
          )
      )

    if (spreadsheetEventDependency) {
      spreadsheetEventDependency.kind = 'Cell'
      spreadsheetEventDependency.scopes.push({ keys: [name], kind: 'Row' })
    } else {
      console.error('spreadsheetEventDependency cell not found')
    }

    const firstArgumentType = 'Cell'
    const finalRhsCodeFragments = codeFragments

    return {
      errors,
      firstArgumentType,
      codeFragments: finalRhsCodeFragments
    }
  }
}
