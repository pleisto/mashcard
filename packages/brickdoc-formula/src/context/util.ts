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
  `#${namespaceId}@${variableId}`

export const spreadsheetKey = (namespaceId: NamespaceId): SpreadsheetKey => `#${namespaceId}`

export const columnKey = (namespaceId: NamespaceId, columnId: ColumnId): ColumnKey => `#${namespaceId}#${columnId}`

export const database2completion = (database: Database): SpreadsheetCompletion => {
  const value = spreadsheetKey(database.blockId)
  return {
    kind: 'spreadsheet',
    replacements: [database.name()],
    weight: 10,
    name: database.name(),
    namespace: database.blockId,
    value,
    preview: database,
    codeFragment: {
      meta: { name: database.name(), blockId: database.blockId },
      errors: [],
      name: value,
      code: 'Spreadsheet',
      spaceBefore: false,
      spaceAfter: false,
      type: 'any'
    }
  }
}

export const column2completion = (column: Column): ColumnCompletion => {
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
    namespace: column.spreadsheetName,
    value,
    preview: column,
    codeFragment: {
      meta: { name: column.name, spreadsheetName: column.spreadsheetName },
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
    codeFragment: {
      meta: {
        name: variable.t.name,
        namespaceId: variable.t.namespaceId,
        namespace: variable.namespaceName()
      },
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
    codeFragment: {
      meta: undefined,
      errors: [],
      name: value,
      code: 'Function',
      spaceBefore: false,
      spaceAfter: false,
      type: 'any'
    }
  }
}
