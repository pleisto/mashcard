import {
  ColumnCompletion,
  ColumnId,
  ColumnKey,
  FunctionClause,
  FunctionCompletion,
  NamespaceId,
  SpreadsheetCompletion,
  BlockKey,
  VariableCompletion,
  VariableId,
  VariableInterface,
  VariableKey,
  BlockCompletion,
  BlockFormulaName,
  ContextInterface,
  FunctionKey
} from '../types'
import { ColumnType, SpreadsheetType } from '../controls'
import { BlockClass } from '../controls/block'

export const variableKey = (namespaceId: NamespaceId, variableId: VariableId): VariableKey =>
  `#${namespaceId}.${variableId}`

export const blockKey = (namespaceId: NamespaceId): BlockKey => `#${namespaceId}`

export const columnKey = (namespaceId: NamespaceId, columnId: ColumnId): ColumnKey => `#${namespaceId}.${columnId}`

export const block2completion = (
  ctx: ContextInterface,
  { key, name, value }: BlockFormulaName,
  weight: number
): BlockCompletion => {
  const block = new BlockClass(ctx, { id: key })
  return {
    kind: 'block',
    weight: weight + 0,
    replacements: [name],
    positionChange: value.length,
    name,
    namespace: key,
    value,
    preview: block,
    renderDescription: blockId => '',
    codeFragment: {
      namespaceId: key,
      hidden: false,
      display: block.name,
      errors: [],
      name: value,
      code: 'Block',
      spaceBefore: false,
      spaceAfter: false,
      type: 'any'
    }
  }
}

export const spreadsheet2completion = (spreadsheet: SpreadsheetType): SpreadsheetCompletion => {
  const value = blockKey(spreadsheet.blockId)
  return {
    kind: 'spreadsheet',
    replacements: [spreadsheet.name()],
    weight: 10,
    name: spreadsheet.name(),
    positionChange: value.length,
    namespace: spreadsheet.blockId,
    value,
    preview: spreadsheet,
    renderDescription: blockId => '',
    codeFragment: {
      namespaceId: spreadsheet.blockId,
      hidden: false,
      display: spreadsheet.name,
      errors: [],
      name: value,
      code: 'Spreadsheet',
      spaceBefore: false,
      spaceAfter: false,
      type: 'any'
    }
  }
}

export const column2completion = (column: ColumnType): ColumnCompletion => {
  const value = columnKey(column.namespaceId, column.columnId)
  return {
    kind: 'column',
    replacements: [
      `${blockKey(column.namespaceId)}.${column.name}`,
      `${blockKey(column.namespaceId)}.`,
      `${blockKey(column.namespaceId)}`,
      `${column.name}`
    ],
    weight: -3,
    name: column.name,
    positionChange: value.length,
    namespace: column.spreadsheet.name(),
    value,
    preview: column,
    renderDescription: blockId => column.spreadsheet.name(),
    codeFragment: {
      namespaceId: column.namespaceId,
      hidden: false,
      display: () => column.name,
      errors: [],
      name: value,
      code: 'Column',
      spaceBefore: false,
      spaceAfter: false,
      type: 'any'
    }
  }
}

export const variable2completion = (variable: VariableInterface, weight: number): VariableCompletion => {
  const value = variableKey(variable.t.namespaceId, variable.t.variableId)
  return {
    kind: 'variable',
    replacements: [`${blockKey(variable.t.namespaceId)}.`, blockKey(variable.t.namespaceId), variable.t.name],
    weight,
    name: variable.t.name,
    namespace: variable.namespaceName(),
    value,
    preview: variable,
    positionChange: value.length,
    renderDescription: blockId => (blockId === variable.t.namespaceId ? '' : variable.namespaceName()),
    codeFragment: {
      namespaceId: variable.t.namespaceId,
      hidden: false,
      display: () => variable.t.name,
      errors: [],
      name: value,
      code: 'Variable',
      spaceBefore: false,
      spaceAfter: false,
      type: 'any'
    }
  }
}

export const function2completion = (functionClause: FunctionClause<any>, weight: number): FunctionCompletion => {
  const value: `${FunctionKey}()` = `${functionClause.key}()`
  return {
    kind: 'function',
    replacements: [functionClause.name],
    weight,
    name: functionClause.name,
    namespace: functionClause.group,
    value,
    preview: functionClause,
    positionChange: value.length - 1,
    renderDescription: blockId => (functionClause.group === 'core' ? '' : functionClause.group),
    codeFragment: {
      display: () => value,
      hidden: false,
      errors: [],
      name: value,
      code: 'Function',
      spaceBefore: false,
      spaceAfter: false,
      type: 'any'
    }
  }
}
