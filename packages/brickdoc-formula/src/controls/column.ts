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

export class ColumnClass implements ColumnType {
  columnId: ColumnId
  name: ColumnName
  namespaceId: NamespaceId
  index: number
  spreadsheet: SpreadsheetType

  constructor(spreadsheet: SpreadsheetType, { columnId, namespaceId, name, index }: ColumnInitializer) {
    this.columnId = columnId
    this.namespaceId = namespaceId
    this.name = name
    this.index = index
    this.spreadsheet = spreadsheet
  }

  cells(): CellType[] {
    return this.spreadsheet.listCells({ columnId: this.columnId })
  }

  persistence(): ColumnInitializer {
    return {
      columnId: this.columnId,
      namespaceId: this.namespaceId,
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

    const firstArgumentType = 'Cell'
    const finalRhsCodeFragments = codeFragments

    return {
      errors,
      firstArgumentType,
      codeFragments: finalRhsCodeFragments
    }
  }
}
