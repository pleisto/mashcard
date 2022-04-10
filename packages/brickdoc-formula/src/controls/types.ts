import { FormulaInterpreter } from '../grammar'
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
  FormulaType,
  SpreadsheetId,
  NameDependencyWithKind,
  EventDependency,
  FindKey
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
  name: string
}

type handleInterpretType = (interpreter: FormulaInterpreter, name: string) => Promise<AnyTypeResult>
export type getEventDependencyInput = { rowKey?: string; columnKey?: string } & (
  | {
      rowKey: string
    }
  | { columnKey: string }
  | {}
)

type getEventDependency = ({ rowKey, columnKey }: getEventDependencyInput) => EventDependency
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
export interface BlockType {
  id: NamespaceId
  _formulaContext: ContextInterface
  name: (pageId: NamespaceId) => string
  nameDependency: () => NameDependencyWithKind
  cleanup: VoidFunction
  persistence: () => BlockInitializer
  handleCodeFragments: handleCodeFragmentsType
  handleInterpret: handleInterpretType
}

export interface ColumnInitializer {
  columnId: ColumnId
  spreadsheetId: SpreadsheetId
  name: ColumnName
  title: string | undefined
  displayIndex: string
  index: number
  sort: number
}

export interface ColumnType extends ColumnInitializer {
  spreadsheet: SpreadsheetType
  namespaceId: NamespaceId
  findKey: FindKey
  logic: boolean
  display: () => string
  key: () => string
  handleCodeFragments: handleCodeFragmentsType
  handleInterpret: handleInterpretType
  eventDependency: getEventDependency
  cells: () => Cell[]
}

export interface Row {
  spreadsheetId: SpreadsheetId
  rowId: uuid
  rowIndex: number
}

export interface RowType extends Row {
  spreadsheet: SpreadsheetType
  namespaceId: NamespaceId
  findKey: FindKey
  listCells: () => Cell[]
  logic: boolean
  display: () => string
  key: () => string
  handleCodeFragments: handleCodeFragmentsType
  handleInterpret: handleInterpretType
  eventDependency: getEventDependency
}

export interface RangeType {
  spreadsheetId: SpreadsheetId
  columnSize: number
  rowSize: number
  rowIds: uuid[]
  columnIds: uuid[]
  startCell: Cell
  endCell: Cell
}

export interface Cell {
  namespaceId: NamespaceId
  spreadsheetId: SpreadsheetId
  cellId: uuid
  columnId: ColumnId
  rowId: uuid
  columnIndex: number
  rowIndex: number
  value: string
  displayData: VariableDisplayData | undefined
}

export interface CellType extends Cell {
  spreadsheet: SpreadsheetType
  columnKey: string
  rowKey: string
  eventDependency: getEventDependency
}

export interface SpreadsheetInitializer {
  spreadsheetId: SpreadsheetId
  namespaceId: NamespaceId
  ctx: BaseFunctionContext
  dynamic: boolean
  name: string
  columns: ColumnInitializer[]
  rows: Row[]
  getCell: ({
    rowId,
    columnId,
    rowIndex,
    columnIndex
  }: {
    rowId: uuid
    columnId: uuid
    rowIndex: number
    columnIndex: number
  }) => Cell
}

export interface SpreadsheetDynamicPersistence {
  spreadsheetId: SpreadsheetId
  namespaceId: NamespaceId
  spreadsheetName: string
  columns: ColumnInitializer[]
  rows: Row[]
  cells: Cell[]
}

export interface SpreadsheetAllPersistence {
  spreadsheetId: SpreadsheetId
  namespaceId: NamespaceId
  rowCount: number
  columnCount: number
  persistence?: SpreadsheetDynamicPersistence
}

export interface SpreadsheetType {
  spreadsheetId: SpreadsheetId
  namespaceId: NamespaceId
  dynamic: boolean
  cleanup: (hard: boolean) => void
  persistence?: SpreadsheetDynamicPersistence
  handleCodeFragments: handleCodeFragmentsType
  handleInterpret: handleInterpretType
  eventDependency: getEventDependency
  nameDependency: () => NameDependencyWithKind
  columnCount: () => number
  rowCount: () => number
  name: () => string
  listColumns: () => ColumnInitializer[]
  listRows: () => Row[]
  listCells: ({ rowId, columnId }: { rowId?: uuid; columnId?: uuid }) => Cell[]
  findCellValue: ({ rowId, columnId }: { rowId: uuid; columnId: uuid }) => string | undefined
  findCellDisplayData: ({ rowId, columnId }: { rowId: uuid; columnId: uuid }) => VariableDisplayData | undefined
  findRow: (key: FindKey) => RowType | undefined
  findColumn: (key: FindKey) => ColumnType | undefined
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
