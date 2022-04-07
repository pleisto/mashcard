import { SpreadsheetReloadViaId } from '@brickdoc/schema'
import { CodeFragmentVisitor, FormulaInterpreter } from '../grammar'
import { AnyTypeResult, CodeFragment, ErrorMessage, FormulaType, SpreadsheetId, uuid } from '../types'
import { CellClass } from './cell'
import { rowColumnKey2eventDependency } from './event'
import { Cell, Row, RowType, SpreadsheetType } from './types'

export class RowClass implements RowType {
  spreadsheetId: SpreadsheetId
  rowId: uuid
  rowIndex: number
  spreadsheet: SpreadsheetType
  logic: boolean

  constructor(spreadsheet: SpreadsheetType, { spreadsheetId, rowId, rowIndex }: Row, logic: boolean) {
    this.spreadsheetId = spreadsheetId
    this.rowId = rowId
    this.rowIndex = rowIndex

    this.spreadsheet = spreadsheet
    this.logic = logic
  }

  display(): string {
    return String(this.rowIndex + 1)
  }

  key(): string {
    return this.logic ? String(this.rowIndex + 1) : this.rowId
  }

  listCells: () => Cell[] = () => {
    return this.spreadsheet.listCells({ rowId: this.rowId })
  }

  persistence(): Row {
    return {
      rowIndex: this.rowIndex,
      rowId: this.rowId,
      spreadsheetId: this.spreadsheetId
    }
  }

  async handleInterpret(interpreter: FormulaInterpreter, name: string): Promise<AnyTypeResult> {
    const column = this.spreadsheet.getColumnByName(name)
    if (!column) {
      return {
        type: 'Error',
        result: `Column "${name}" not found`,
        errorKind: 'runtime'
      }
    }

    if (interpreter.ctx.meta.richType.type === 'spreadsheet') {
      const { spreadsheetId, rowId, columnId } = interpreter.ctx.meta.richType.meta
      if (spreadsheetId === this.spreadsheetId && rowId === this.rowId && columnId === column.columnId) {
        return {
          result: 'Circular dependency found',
          type: 'Error',
          errorKind: 'circular_dependency'
        }
      }
    }

    const cell = this.spreadsheet.listCells({ rowId: this.rowId, columnId: column.columnId })[0]
    if (!cell) {
      return {
        type: 'Error',
        result: `Cell "${name}" not found`,
        errorKind: 'runtime'
      }
    }

    return { type: 'Cell', result: new CellClass(this.spreadsheet, cell, { rowKey: this.key(), columnKey: name }) }
  }

  handleCodeFragments(
    visitor: CodeFragmentVisitor,
    name: string,
    codeFragments: CodeFragment[]
  ): { errors: ErrorMessage[]; firstArgumentType: FormulaType | undefined; codeFragments: CodeFragment[] } {
    visitor.eventDependencies = visitor.eventDependencies
      .reverse()
      .filter(
        d =>
          !(
            d.kind === 'Row' &&
            d.event === SpreadsheetReloadViaId &&
            d.eventId === `${this.spreadsheet.namespaceId},${this.spreadsheetId}`
          )
      )
      .reverse()

    visitor.eventDependencies.push(rowColumnKey2eventDependency(this, name))

    const column = this.spreadsheet.getColumnByName(name)

    if (!column) {
      return {
        errors: [{ type: 'deps', message: `Column "${name}" not found` }],
        firstArgumentType: undefined,
        codeFragments
      }
    }

    const cell = this.spreadsheet.listCells({ rowId: this.rowId, columnId: column.columnId })[0]
    if (!cell) {
      return {
        errors: [{ type: 'deps', message: `Cell "${name}" not found` }],
        firstArgumentType: undefined,
        codeFragments
      }
    }

    const errors: ErrorMessage[] = []

    if (visitor.ctx.meta.richType.type === 'spreadsheet') {
      const { spreadsheetId, rowId, columnId } = visitor.ctx.meta.richType.meta
      if (spreadsheetId === this.spreadsheetId && rowId === this.rowId && columnId === column.columnId) {
        return {
          errors: [{ type: 'circular_dependency', message: `Circular dependency found` }],
          firstArgumentType: undefined,
          codeFragments
        }
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
