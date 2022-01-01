import {
  ColumnCompletion,
  ColumnId,
  ColumnKey,
  FunctionClause,
  FunctionCompletion,
  NamespaceId,
  SpreadsheetCompletion,
  SpreadsheetKey,
  VariableCompletion,
  VariableId,
  VariableInterface,
  VariableKey,
  RenderCodeFragmentFunction,
  ErrorMessage
} from '../types'
import { ColumnType, DatabaseType } from '../controls'

export const variableKey = (namespaceId: NamespaceId, variableId: VariableId): VariableKey =>
  `#${namespaceId}@${variableId}`

export const spreadsheetKey = (namespaceId: NamespaceId): SpreadsheetKey => `#${namespaceId}`

export const columnKey = (namespaceId: NamespaceId, columnId: ColumnId): ColumnKey => `#${namespaceId}#${columnId}`

export const renderDatabase = (database: DatabaseType, errorMessages: ErrorMessage[]): RenderCodeFragmentFunction => {
  const error = errorMessages.length === 0 ? '' : errorMessages[0].message
  return blockId => [
    {
      value: spreadsheetKey(database.blockId),
      display: database.name(),
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
      value: spreadsheetKey(column.namespaceId),
      display: column.database.name(),
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
            value: variableKey(variable.t.namespaceId, variable.t.variableId),
            display: variable.t.name,
            error,
            code: 'Variable',
            type: variable.t.variableValue.result.type
          }
        ]
}

export const database2completion = (database: DatabaseType): SpreadsheetCompletion => {
  const value = spreadsheetKey(database.blockId)
  return {
    kind: 'spreadsheet',
    replacements: [database.name()],
    weight: 10,
    name: database.name(),
    namespace: database.blockId,
    value,
    preview: database,
    renderDescription: blockId => '',
    codeFragment: {
      namespaceId: database.blockId,
      render: renderDatabase(database, []),
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
      `${spreadsheetKey(column.namespaceId)}.${column.name}`,
      `${spreadsheetKey(column.namespaceId)}.`,
      `${spreadsheetKey(column.namespaceId)}`
    ],
    weight: -3,
    name: column.name,
    namespace: column.database.name(),
    value,
    preview: column,
    renderDescription: blockId => column.database.name(),
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
