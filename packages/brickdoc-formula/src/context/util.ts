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
  ContextInterface
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
  return {
    kind: 'block',
    weight: weight + 0,
    replacements: [name],
    name,
    namespace: key,
    value,
    preview: new BlockClass(ctx, { id: key }),
    renderDescription: blockId => '',
    codeFragment: {
      namespaceId: key,
      hidden: false,
      display: name,
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
    namespace: spreadsheet.blockId,
    value,
    preview: spreadsheet,
    renderDescription: blockId => '',
    codeFragment: {
      namespaceId: spreadsheet.blockId,
      hidden: false,
      display: spreadsheet.name(),
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
      `${column.name}`,
      `${blockKey(column.namespaceId)}.${column.name}`,
      `${blockKey(column.namespaceId)}.`,
      `${blockKey(column.namespaceId)}`
    ],
    weight: -3,
    name: column.name,
    namespace: column.spreadsheet.name(),
    value,
    preview: column,
    renderDescription: blockId => column.spreadsheet.name(),
    codeFragment: {
      namespaceId: column.namespaceId,
      hidden: false,
      display: column.name,
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
    replacements: [variable.t.name],
    weight,
    name: variable.t.name,
    namespace: variable.namespaceName(),
    value,
    preview: variable,
    renderDescription: blockId => (blockId === variable.t.namespaceId ? '' : variable.namespaceName()),
    codeFragment: {
      namespaceId: variable.t.namespaceId,
      hidden: false,
      display: variable.t.name,
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
  return {
    kind: 'function',
    replacements: [functionClause.name],
    weight,
    name: functionClause.name,
    namespace: functionClause.group,
    value: functionClause.key,
    preview: functionClause,
    renderDescription: blockId => (functionClause.group === 'core' ? '' : functionClause.group),
    codeFragment: {
      display: functionClause.key,
      hidden: false,
      errors: [],
      name: functionClause.key,
      code: 'Function',
      spaceBefore: false,
      spaceAfter: false,
      type: 'any'
    }
  }
}
