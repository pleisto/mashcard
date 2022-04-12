import { ColumnType, ColumnInitializer, SpreadsheetType, Cell, getEventDependencyInput } from './types'
import {
  AnyTypeResult,
  CellResult,
  CodeFragment,
  ColumnId,
  ColumnName,
  ErrorMessage,
  ErrorResult,
  EventDependency,
  FindKey,
  FormulaType,
  NamespaceId,
  VariableMetadata
} from '../types'
import { codeFragments2definition, CodeFragmentVisitor, FormulaInterpreter } from '../grammar'
import { CellClass } from '.'
import { SpreadsheetReloadViaId } from '../events'

export class ColumnClass implements ColumnType {
  columnId: ColumnId
  name: ColumnName
  namespaceId: NamespaceId
  spreadsheetId: NamespaceId
  findKey: FindKey
  index: number
  sort: number
  title: string | undefined
  displayIndex: string
  spreadsheet: SpreadsheetType
  logic: boolean

  constructor(
    spreadsheet: SpreadsheetType,
    { columnId, spreadsheetId, name, index, sort, displayIndex, title }: ColumnInitializer,
    logic: boolean,
    findKey: FindKey
  ) {
    this.sort = sort
    this.title = title
    this.displayIndex = displayIndex
    this.columnId = columnId
    this.spreadsheetId = spreadsheetId
    this.namespaceId = spreadsheet.namespaceId
    this.name = name
    this.index = index
    this.logic = logic
    this.findKey = findKey
    this.spreadsheet = spreadsheet
  }

  display(): string {
    return this.logic ? this.displayIndex : this.name
  }

  key(): string {
    return this.logic ? this.displayIndex : this.columnId
  }

  cells(): Cell[] {
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

  private findCellByNumber(meta: VariableMetadata, name: string): CellResult | ErrorResult {
    const number = Number(name)
    if (isNaN(number)) {
      return { type: 'Error', result: `Need a number: ${name}`, errorKind: 'syntax' }
    }
    const cells = this.cells()
    const cell = cells[number - 1]

    if (!cell) {
      return { type: 'Error', result: `Cell out of range: ${cells.length}`, errorKind: 'runtime' }
    }

    if (meta.richType.type === 'spreadsheet') {
      const { spreadsheetId, rowId, columnId } = meta.richType.meta
      if (spreadsheetId === this.spreadsheetId && rowId === cell.rowId && columnId === cell.columnId) {
        return {
          result: 'Circular dependency found',
          type: 'Error',
          errorKind: 'circular_dependency'
        }
      }
    }

    return {
      type: 'Cell',
      result: new CellClass(this.spreadsheet, cell, {
        columnKey: this.key(),
        rowKey: name,
        cleanupEventDependency: this.eventDependency({})
      })
    }
  }

  eventDependency({ rowKey }: getEventDependencyInput): EventDependency {
    if (rowKey) {
      return {
        kind: 'Cell',
        event: SpreadsheetReloadViaId,
        key: `Column#Cell#${this.spreadsheetId}#${this.key()}#${rowKey}`,
        eventId: `${this.spreadsheet.namespaceId},${this.spreadsheetId}`,
        scope: { rows: [rowKey], columns: [this.key()] },
        cleanup: this.eventDependency({})
      }
    }
    return {
      ...this.spreadsheet.eventDependency({ columnKey: this.key() }),
      definitionHandler: (deps, variable, payload) => {
        if (this.logic) return
        const newColumn = this.spreadsheet.listColumns().find(c => c.columnId === this.columnId)
        if (!newColumn) return
        const newCodeFragments = variable.t.codeFragments.map(c => {
          if (c.code !== 'Column') return c
          if (c.attrs.id !== this.columnId) return c
          return { ...c, attrs: { ...c.attrs, name: newColumn.name } }
        })
        return codeFragments2definition(newCodeFragments, variable.t.namespaceId)
      }
    }
  }

  async handleInterpret(interpreter: FormulaInterpreter, name: string): Promise<AnyTypeResult> {
    return this.findCellByNumber(interpreter.ctx.meta, name)
  }

  handleCodeFragments(
    visitor: CodeFragmentVisitor,
    name: string,
    codeFragments: CodeFragment[]
  ): { errors: ErrorMessage[]; firstArgumentType: FormulaType | undefined; codeFragments: CodeFragment[] } {
    visitor.eventDependencies.push(this.eventDependency({ rowKey: name }))

    const result = this.findCellByNumber(visitor.ctx.meta, name)
    const errors: ErrorMessage[] = []

    if (result.type === 'Error') {
      errors.push({ type: result.errorKind, message: result.result })
      return {
        errors,
        firstArgumentType: undefined,
        codeFragments
      }
    }

    const cell = result.result
    if (visitor.ctx.meta.richType.type === 'spreadsheet') {
      const { spreadsheetId, rowId, columnId } = visitor.ctx.meta.richType.meta
      if (spreadsheetId === this.spreadsheetId && rowId === cell.rowId && columnId === cell.columnId) {
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
