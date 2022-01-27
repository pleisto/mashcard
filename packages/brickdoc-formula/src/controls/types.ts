import {
  ColumnId,
  ColumnName,
  FormulaControlType,
  BaseFunctionContext,
  FunctionResult,
  NamespaceId,
  StringResult,
  uuid,
  VariableMetadata,
  ContextInterface
} from '../types'

export interface ControlType {
  _formulaContext: ContextInterface
  _meta: VariableMetadata
  kind: FormulaControlType
  disabled: boolean
  persistence: () => ControlInitializer
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ControlInitializer {}
export interface ButtonType extends ControlType {
  kind: 'Button'
  name: string
  fn: FunctionResult
  onClick?: VoidFunction
}

export interface BlockInitializer {
  id: NamespaceId
}

export interface BlockType extends BlockInitializer {
  _formulaContext: ContextInterface
  name: () => string
  persistence: () => BlockInitializer
}

export interface ColumnInitializer {
  columnId: ColumnId
  namespaceId: NamespaceId
  name: ColumnName
  index: number
}

export interface ColumnType extends ColumnInitializer {
  spreadsheet: SpreadsheetType
  cells: () => Cell[]
}

export interface Row {
  rowId: uuid
}

export interface Cell {
  cellId: uuid
  columnId: ColumnId
  rowId: uuid
  value: string
  data: object
}

export interface SpreadsheetInitializer {
  blockId: NamespaceId
  ctx: BaseFunctionContext
  dynamic: boolean
  name: string
  listColumns: () => ColumnInitializer[]
  listRows: () => Row[]
  listCells: ({ rowId, columnId }: { rowId?: uuid; columnId?: uuid }) => Cell[]
}

export interface SpreadsheetPersistence {
  blockId: NamespaceId
  spreadsheetName: string
  columns: ColumnInitializer[]
  rows: Row[]
  cells: Cell[]
}

export interface SpreadsheetType {
  blockId: NamespaceId
  dynamic: boolean
  persistence?: SpreadsheetPersistence
  columnCount: () => number
  rowCount: () => number
  name: () => string
  listColumns: () => ColumnInitializer[]
  listRows: () => Row[]
  listCells: ({ rowId, columnId }: { rowId?: uuid; columnId?: uuid }) => Cell[]
  findCellValue: ({ rowId, columnId }: { rowId: uuid; columnId: uuid }) => string | undefined
  getRow: (rowId: uuid) => Row | undefined
  getColumn: (columnId: ColumnId) => ColumnInitializer | undefined
  toArray: () => string[][]
  toRecord: () => Array<Record<string, StringResult>>
  persist: () => SpreadsheetPersistence
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
  checked: boolean
  fn: FunctionResult
  onChange?: (bool: boolean) => void
}

export interface SwitchInitializer extends ControlInitializer {
  checked: boolean
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
