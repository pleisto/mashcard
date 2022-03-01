import { AnyTypeResult, BaseResult, FunctionContext, VariableData, VariableDisplayData } from '../types'
import {
  SwitchClass,
  ButtonClass,
  SelectClass,
  ColumnClass,
  SpreadsheetClass,
  SpreadsheetPersistence
} from '../controls'
import { BlockClass } from '../controls/block'

const VARIABLE_VERSION = 0

export const dumpDisplayResult = (t: VariableData): VariableDisplayData => {
  return {
    definition: t.definition,
    result: dumpValue(t.variableValue.result) as any,
    type: t.type,
    kind: t.kind,
    version: VARIABLE_VERSION
  }
}

export const loadDisplayResult = (ctx: FunctionContext, displayResult: VariableDisplayData): VariableDisplayData => {
  return { ...displayResult, result: loadValue(ctx, displayResult.result) as any }
}

export const dumpValue = (cacheValue: BaseResult): BaseResult => {
  if (
    cacheValue.result instanceof ColumnClass ||
    cacheValue.result instanceof BlockClass ||
    cacheValue.result instanceof ButtonClass ||
    cacheValue.result instanceof SelectClass ||
    cacheValue.result instanceof SwitchClass
  ) {
    return { type: cacheValue.type, result: cacheValue.result.persistence() }
  }

  return cacheValue
}

export const loadValue = (ctx: FunctionContext, cacheValue: BaseResult): AnyTypeResult => {
  if (cacheValue.type === 'Date' && !(cacheValue.result instanceof Date)) {
    return {
      type: 'Date',
      result: new Date(cacheValue.result)
    }
  }

  if (cacheValue.type === 'Spreadsheet' && !(cacheValue.result instanceof SpreadsheetClass)) {
    if (cacheValue.result.dynamic) {
      const { blockId, spreadsheetName, columns, rows, cells }: SpreadsheetPersistence = cacheValue.result.persistence!
      return {
        type: 'Spreadsheet',
        result: new SpreadsheetClass({
          ctx,
          blockId,
          dynamic: true,
          name: spreadsheetName,
          listColumns: () => columns,
          listRows: () => rows,
          listCells: ({ rowId, columnId }) => {
            let finalCells = cells
            if (rowId) {
              finalCells = finalCells.filter(cell => cell.rowId === rowId)
            }
            if (columnId) {
              finalCells = finalCells.filter(cell => cell.columnId === columnId)
            }
            return finalCells
          }
        })
      }
    } else {
      const spreadsheet = ctx.formulaContext.findSpreadsheet(cacheValue.result.blockId)
      if (spreadsheet) {
        return { type: 'Spreadsheet', result: spreadsheet }
      } else {
        return { type: 'Error', result: `Spreadsheet ${cacheValue.result.blockId} not found`, errorKind: 'deps' }
      }
    }
  }

  if (cacheValue.type === 'Column' && !(cacheValue.result instanceof ColumnClass)) {
    const spreadsheet = ctx.formulaContext.findSpreadsheet(cacheValue.result.namespaceId)
    if (spreadsheet) {
      return { type: 'Column', result: new ColumnClass(spreadsheet, cacheValue.result) }
    } else {
      return { type: 'Error', result: `Spreadsheet ${cacheValue.result.namespaceId} not found`, errorKind: 'deps' }
    }
  }

  if (cacheValue.type === 'Block' && !(cacheValue.result instanceof BlockClass)) {
    const blockResult = new BlockClass(ctx.formulaContext, cacheValue.result)
    return { type: 'Block', result: blockResult }
  }

  if (cacheValue.type === 'Button' && !(cacheValue.result instanceof ButtonClass)) {
    const buttonResult = new ButtonClass(ctx, cacheValue.result)
    return { type: 'Button', result: buttonResult }
  }

  if (cacheValue.type === 'Switch' && !(cacheValue.result instanceof SwitchClass)) {
    const switchResult = new SwitchClass(ctx, cacheValue.result)
    return { type: 'Switch', result: switchResult }
  }

  if (cacheValue.type === 'Select' && !(cacheValue.result instanceof SelectClass)) {
    const selectResult = new SelectClass(ctx, cacheValue.result)
    return { type: 'Select', result: selectResult }
  }

  // devLog({ cacheValue })

  return cacheValue as AnyTypeResult
}
