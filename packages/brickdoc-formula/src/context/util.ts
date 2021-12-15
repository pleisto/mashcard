import {
  Column,
  ColumnCompletion,
  ColumnId,
  ColumnKey,
  Database,
  FunctionClause,
  FunctionCompletion,
  NamespaceId,
  SpreadsheetCompletion,
  SpreadsheetKey,
  VariableCompletion,
  VariableId,
  VariableInterface,
  VariableKey
} from '..'

export const variableKey = (namespaceId: NamespaceId, variableId: VariableId): VariableKey =>
  `$${namespaceId}@${variableId}`

export const spreadsheetKey = (namespaceId: NamespaceId): SpreadsheetKey => `$${namespaceId}`

export const columnKey = (namespaceId: NamespaceId, columnId: ColumnId): ColumnKey => `$${namespaceId}#${columnId}`

export const database2completion = (database: Database): SpreadsheetCompletion => {
  return {
    kind: 'spreadsheet',
    replacements: [database.name()],
    weight: 10,
    name: database.name(),
    namespace: database.blockId,
    value: spreadsheetKey(database.blockId),
    preview: database
  }
}

export const column2completion = (column: Column): ColumnCompletion => {
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
    namespace: column.spreadsheetName,
    value: columnKey(column.namespaceId, column.columnId),
    preview: column
  }
}

export const variable2completion = (variable: VariableInterface, weight: number): VariableCompletion => {
  return {
    kind: 'variable',
    replacements: [variable.t.name],
    weight,
    name: variable.t.name,
    namespace: variable.t.namespaceId,
    value: variableKey(variable.t.namespaceId, variable.t.variableId),
    preview: variable.t
  }
}

export const function2completion = (functionClause: FunctionClause<any>, weight: number): FunctionCompletion => {
  return {
    kind: 'function',
    replacements: [functionClause.name],
    weight,
    name: functionClause.name,
    namespace: functionClause.group,
    value: functionClause.args.length ? functionClause.key : `${functionClause.key}()`,
    preview: functionClause
  }
}
