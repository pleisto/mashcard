import {
  ColumnId,
  ColumnName,
  FormulaControlType,
  FunctionResult,
  NamespaceId,
  SpreadsheetName,
  StringResult,
  uuid,
  VariableMetadata
} from '..'

export interface ControlType {
  meta: VariableMetadata
  kind: FormulaControlType
  disabled: boolean
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ControlInitializer {}
export interface ButtonType extends ControlType {
  kind: 'Button'
  name: string
  fn: FunctionResult
  onClick?: () => void
}

export interface Column {
  namespaceId: NamespaceId
  columnId: ColumnId
  name: ColumnName
  spreadsheetName: SpreadsheetName
  index: number
  type: string
  rows: string[]
}

export interface Row {
  id: string
  [key: string]: string
}

export interface DatabaseInitializer {
  blockId: NamespaceId
  dynamic: boolean
  name: () => string
  listColumns: () => Column[]
  listRows: () => Row[]
}

export interface DatabasePersistence {
  blockId: NamespaceId
  tableName: string
  columns: Column[]
  rows: Row[]
}

export interface Database {
  blockId: NamespaceId
  dynamic: boolean
  persistence?: DatabasePersistence
  columnCount: () => number
  rowCount: () => number
  name: () => string
  listColumns: () => Column[]
  listRows: () => Row[]
  getRow: (rowId: uuid) => Row | undefined
  getColumn: (columnId: ColumnId) => Column | undefined
  toArray: () => string[][]
  toRecord: () => Array<{ [key: string]: StringResult }>
  persist: () => DatabasePersistence
}

export interface ButtonInitializer extends ControlInitializer {
  name: string
  fn: FunctionResult
}

export interface InputType extends ControlType {
  kind: 'Input'
  value: string
  fn: FunctionResult
  onChange?: (value: string) => void
}

export interface InputInitializer extends ControlInitializer {
  value: string
  fn: FunctionResult
}

export interface SwitchType extends ControlType {
  kind: 'Switch'
  isSelected: boolean
  fn: FunctionResult
  onChange?: (bool: boolean) => void
}

export interface SwitchInitializer extends ControlInitializer {
  isSelected: boolean
  fn: FunctionResult
}

// interface SelectOption {
//   label: string
//   value: string
// }

export type SelectOption = string

export interface SelectType extends ControlType {
  kind: 'Select'
  options: [SelectOption, ...SelectOption[]]
  value: SelectOption
  fn: FunctionResult
  onChange?: (value: string) => void
}

export interface SelectInitializer extends ControlInitializer {
  options: [SelectOption, ...SelectOption[]]
  value: SelectOption
  fn: FunctionResult
}
