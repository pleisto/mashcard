import { SpreadsheetReloadViaId } from '../events'
import { CodeFragmentVisitor, FormulaInterpreter } from '../grammar'
import {
  AnyTypeResult,
  CodeFragment,
  ErrorMessage,
  EventDependency,
  FindKey,
  FormulaType,
  NamespaceId,
  SpreadsheetId,
  uuid
} from '../types'
import { CellClass } from './cell'
import { Cell, CellType, getEventDependencyInput, Row, RowType, SpreadsheetType } from './types'

export class RowClass implements RowType {
  spreadsheetId: SpreadsheetId
  namespaceId: NamespaceId
  rowId: uuid
  rowIndex: number
  findKey: FindKey
  spreadsheet: SpreadsheetType
  logic: boolean

  constructor(spreadsheet: SpreadsheetType, { spreadsheetId, rowId, rowIndex }: Row, logic: boolean, findKey: FindKey) {
    this.spreadsheetId = spreadsheetId
    this.namespaceId = spreadsheet.namespaceId
    this.rowId = rowId
    this.rowIndex = rowIndex
    this.findKey = findKey

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

  persistence(): Row & { findKey: FindKey } {
    return {
      findKey: this.findKey,
      rowIndex: this.rowIndex,
      rowId: this.rowId,
      spreadsheetId: this.spreadsheetId
    }
  }

  eventDependency({ columnKey }: getEventDependencyInput): EventDependency {
    if (columnKey) {
      return {
        kind: 'Cell',
        event: SpreadsheetReloadViaId,
        eventId: `${this.spreadsheet.namespaceId},${this.spreadsheetId}`,
        key: `Row#Cell#${this.spreadsheetId}#${columnKey}#${this.key()}`,
        scope: { rows: [this.key()], columns: [columnKey] },
        cleanup: this.eventDependency({})
      }
    }

    return this.spreadsheet.eventDependency({ rowKey: this.key() })
  }

  async handleInterpret(interpreter: FormulaInterpreter, name: string): Promise<AnyTypeResult> {
    const column = this.spreadsheet.findColumn({ namespaceId: this.namespaceId, value: name, type: 'name' })
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

    return { type: 'Cell', result: this.newCell(cell, name) }
  }

  newCell(cell: Cell, columnKey: string): CellType {
    return new CellClass(this.spreadsheet, cell, {
      rowKey: this.key(),
      columnKey,
      cleanupEventDependency: this.eventDependency({})
    })
  }

  handleCodeFragments(
    visitor: CodeFragmentVisitor,
    name: string,
    codeFragments: CodeFragment[]
  ): { errors: ErrorMessage[]; firstArgumentType: FormulaType | undefined; codeFragments: CodeFragment[] } {
    visitor.eventDependencies.push(this.eventDependency({ columnKey: name }))

    const column = this.spreadsheet.findColumn({ namespaceId: this.namespaceId, value: name, type: 'name' })

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
