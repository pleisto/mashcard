import { CodeFragmentVisitor } from '../grammar/codeFragment'
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
  ContextInterface,
  VariableDisplayData,
  AnyTypeResult,
  CodeFragment,
  ErrorMessage,
  FormulaType
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

type handleInterpretType = (name: string) => Promise<AnyTypeResult>
export interface handleCodeFragmentsResult {
  errors: ErrorMessage[]
  firstArgumentType: FormulaType | undefined
  codeFragments: CodeFragment[]
}
type handleCodeFragmentsType = (
  visitor: CodeFragmentVisitor,
  name: string,
  rhsCodeFragments: CodeFragment[]
) => handleCodeFragmentsResult
export interface BlockType extends BlockInitializer {
  _formulaContext: ContextInterface
  name: (pageId: NamespaceId) => string
  persistence: () => BlockInitializer
  handleCodeFragments: handleCodeFragmentsType
  handleInterpret: handleInterpretType
}

export interface ColumnInitializer {
  columnId: ColumnId
  namespaceId: NamespaceId
  name: ColumnName
  index: number
}

export interface ColumnType extends ColumnInitializer {
  spreadsheet: SpreadsheetType
  handleCodeFragments: handleCodeFragmentsType
  handleInterpret: handleInterpretType
  cells: () => CellType[]
}

export interface Row {
  rowId: uuid
  rowIndex: number
}

export interface RowType extends Row {
  cells: CellType[]
}

export interface RangeType {
  spreadsheetId: uuid
  columnSize: number
  rowSize: number
  rowIds: uuid[]
  columnIds: uuid[]
  startCell: CellType
  endCell: CellType
}

export interface CellType {
  spreadsheetId: uuid
  cellId: uuid
  columnId: ColumnId
  rowId: uuid
  columnIndex: number
  rowIndex: number
  value: string
  displayData: VariableDisplayData | undefined
}

export interface SpreadsheetInitializer {
  blockId: NamespaceId
  ctx: BaseFunctionContext
  dynamic: boolean
  name: string
  listColumns: () => ColumnInitializer[]
  listRows: () => Row[]
  listCells: ({ rowId, columnId }: { rowId?: uuid; columnId?: uuid }) => CellType[]
}

export interface SpreadsheetDynamicPersistence {
  blockId: NamespaceId
  spreadsheetName: string
  columns: ColumnInitializer[]
  rows: Row[]
  cells: CellType[]
}

export interface SpreadsheetAllPersistence {
  blockId: NamespaceId
  rowCount: number
  columnCount: number
  persistence?: SpreadsheetDynamicPersistence
}

export interface SpreadsheetType {
  blockId: NamespaceId
  dynamic: boolean
  persistence?: SpreadsheetDynamicPersistence
  handleCodeFragments: handleCodeFragmentsType
  handleInterpret: handleInterpretType
  columnCount: () => number
  rowCount: () => number
  name: () => string
  listColumns: () => ColumnInitializer[]
  listRows: () => Row[]
  listCells: ({ rowId, columnId }: { rowId?: uuid; columnId?: uuid }) => CellType[]
  findCellValue: ({ rowId, columnId }: { rowId: uuid; columnId: uuid }) => string | undefined
  findCellDisplayData: ({ rowId, columnId }: { rowId: uuid; columnId: uuid }) => VariableDisplayData | undefined
  getRow: (rowId: uuid) => Row | undefined
  getColumnById: (columnId: ColumnId) => ColumnInitializer | undefined
  getColumnByName: (name: string) => ColumnInitializer | undefined
  toArray: () => string[][]
  toRecord: () => Array<Record<string, StringResult>>
  persistAll: () => SpreadsheetAllPersistence
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
