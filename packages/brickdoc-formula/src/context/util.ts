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
  RenderCodeFragmentFunction,
  ErrorMessage
} from '../types'
import { ColumnType, SpreadsheetType } from '../controls'

export const variableKey = (namespaceId: NamespaceId, variableId: VariableId): VariableKey =>
  `#${namespaceId}@${variableId}`

export const blockKey = (namespaceId: NamespaceId): BlockKey => `#${namespaceId}`

export const columnKey = (namespaceId: NamespaceId, columnId: ColumnId): ColumnKey => `#${namespaceId}#${columnId}`

export const renderBlock = (
  id: NamespaceId,
  name: () => string,
  errorMessages: ErrorMessage[]
): RenderCodeFragmentFunction => {
  const error = errorMessages.length === 0 ? '' : errorMessages[0].message
  return blockId => [
    {
      value: blockKey(id),
      display: blockId === id ? 'Current Block' : name(),
      error,
      code: 'Block',
      type: 'Block'
    }
  ]
}

export const renderSpreadsheet = (
  spreadsheet: SpreadsheetType,
  errorMessages: ErrorMessage[]
): RenderCodeFragmentFunction => {
  const error = errorMessages.length === 0 ? '' : errorMessages[0].message
  return blockId => [
    {
      value: blockKey(spreadsheet.blockId),
      display: spreadsheet.name(),
      error,
      code: 'Spreadsheet',
      type: 'Spreadsheet'
    }
  ]
}

export const renderColumn = (column: ColumnType, errorMessages: ErrorMessage[]): RenderCodeFragmentFunction => {
  const error = errorMessages.length === 0 ? '' : errorMessages[0].message
  return blockId => [
    {
      value: blockKey(column.namespaceId),
      display: column.spreadsheet.name(),
      error,
      code: 'Spreadsheet',
      type: 'Spreadsheet'
    },
    {
      value: '#',
      display: '.',
      error,
      code: 'Dot',
      type: 'any'
    },
    {
      value: column.columnId,
      display: column.name,
      error,
      code: 'Column',
      type: 'Column'
    }
  ]
}

export const renderVariable = (
  variable: VariableInterface,
  errorMessages: ErrorMessage[]
): RenderCodeFragmentFunction => {
  const error = errorMessages.length === 0 ? '' : errorMessages[0].message
  return blockId =>
    blockId === variable.t.namespaceId
      ? [
          {
            value: variableKey(variable.t.namespaceId, variable.t.variableId),
            display: variable.t.name,
            error,
            code: 'Variable',
            type: variable.t.variableValue.result.type
          }
        ]
      : [
          {
            value: `#${variable.t.namespaceId}`,
            display: variable.namespaceName(),
            error,
            code: 'Block',
            type: 'Block'
          },
          {
            value: '@',
            display: '.',
            error,
            code: 'Dot',
            type: 'any'
          },
          {
            value: variable.t.variableId,
            display: variable.t.name,
            error,
            code: 'Variable',
            type: variable.t.variableValue.result.type
          }
        ]
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
      render: renderSpreadsheet(spreadsheet, []),
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
      render: renderColumn(column, []),
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
      render: renderVariable(variable, []),
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
  const value = functionClause.args.length ? functionClause.key : `${functionClause.key}()`
  return {
    kind: 'function',
    replacements: [functionClause.name],
    weight,
    name: functionClause.name,
    namespace: functionClause.group,
    value,
    preview: functionClause,
    renderDescription: blockId => (functionClause.group === 'core' ? '' : functionClause.group),
    codeFragment: {
      render: undefined,
      errors: [],
      name: value,
      code: 'Function',
      spaceBefore: false,
      spaceAfter: false,
      type: 'any'
    }
  }
}
