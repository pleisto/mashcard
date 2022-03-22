import { CstNode } from 'chevrotain'
import {
  ButtonType,
  InputType,
  ColumnType,
  SpreadsheetType,
  SelectType,
  SwitchType,
  BlockType,
  CellType,
  RowType,
  RangeType
} from '../controls'

type FormulaBasicType = 'number' | 'string' | 'boolean' | 'null'
type FormulaObjectType =
  | 'Date'
  | 'Column'
  | 'Row'
  | 'Cell'
  | 'Range'
  | 'Spreadsheet'
  | 'Block'
  | 'Blank'
  | 'Record'
  | 'Array'
  | 'Error'
  | 'Predicate'
  | 'Function'
  | 'Reference'
  | 'Cst'

export type FormulaControlType = 'Button' | 'Switch' | 'Select' | 'Input' | 'Radio' | 'Rate' | 'Slider'

export type FormulaType =
  | FormulaBasicType
  | FormulaObjectType
  | FormulaControlType
  | 'any'
  | 'void'
  | 'Pending'
  | 'Waiting'
  | 'NoPersist'

export type FormulaCheckType = FormulaType | [FormulaType, ...FormulaType[]]

export type FormulaCodeFragmentType = 'TRUE' | 'FALSE' | 'Function' | 'Variable' | 'FunctionName'

export type FormulaColorType = Exclude<FormulaType, 'boolean'> | FormulaCodeFragmentType

export type ExpressionType = FormulaCheckType | undefined

export type SpecialDefaultVariableName =
  | 'str'
  | 'num'
  | 'bool'
  | 'cst'
  | 'record'
  | 'array'
  | 'date'
  | 'blank'
  | 'column'
  | 'row'
  | 'cell'
  | 'range'
  | 'block'
  | 'var'
  | 'null'
  | 'error'
  | 'void'
  | 'predicate'
  | 'spreadsheet'
  | 'reference'
  | 'function'
  | 'button'
  | 'switch'
  | 'select'
  | 'input'
  | 'radio'
  | 'rate'
  | 'slider'
  | 'pending'
  | 'waiting'
  | 'noPersist'

export type FunctionGroup = 'core' | 'custom' | string

export type FunctionNameType = string
export type VariableName = string
export type ColumnName = string
export type SpreadsheetName = string

export type Definition = string

export type VariableKind = 'literal' | 'constant' | 'expression' | 'unknown'

export type ErrorType =
  | 'type'
  | 'parse'
  | 'syntax'
  | 'runtime'
  | 'fatal'
  | 'deps'
  | 'circular_dependency'
  | 'name_unique'
  | 'name_check'
  | 'name_invalid'
  | 'custom'

export type ParseErrorType = 'parse' | 'syntax'

export type FunctionKey = `${FunctionGroup}::${FunctionNameType}` | FunctionNameType
export type VariableKey = `#${NamespaceId}.${VariableId}`
export type BlockKey = '#CurrentBlock' | `#${NamespaceId}`
export type ColumnKey = `#${NamespaceId}.${ColumnId}`

// TODO blockName -> string
export type BlockName = NamespaceId

export type DefaultVariableName = `${SpecialDefaultVariableName}${number}`

export type PredicateFunction = (input: any) => boolean

// TODO https://www.typescriptlang.org/play?#code/C4TwDgpgBAcgrgWwgJwJYGMoF4oHIAMuUAPngIxGm4BMleAzHbgCxMCsTAbEwOxMAcTAJy4AUKEhQAggBswACwCGAIwjAM2PIqbKm6JgBMmEJgDMmAcybymqJgCsmAayYymCJgDsmAeyZgmAEcmZCYAZyZgJjgmADcmAHcmAA8mECYALzEJaFkFRU9EFA0cPKVVdUxSeCQ0dFFxcGgAJQhIRWAAHlEoXqgAYSVkKAhk4AhPAzCoMOA0TwsAGh6+-p84T2ARsYmpqEKEVWRlvqgAKR9UTwgDbfHJ6dn5i00AA1eTvql0TFH7vfwAG0ALqaEGiAB8mm+6EBuBkEwswBsoL+u2maw2WwA-OdLtdbgAuKCtdpdQaKY4DdabRZQV4AEgA3hcrjcAL7MinIdkfKCA-CLAB0IphwIhDRyUAAqtKAJIAEQAasw3szSRAOp0ygUinU6fwIeyALTqtqaro6g7FdB05hG01MjVaq16jB2h1msnauRKa36qD2k1ei0+-L+91QMjUI2vURAA
// export type uuid = `${string}-${string}-${string}-${string}`
export type uuid = string

export type NamespaceId = uuid
export type VariableId = uuid
export type ColumnId = uuid

export type Feature = string
export type Features = Feature[]

export type PredicateOperator = 'equal' | 'notEqual' | 'greaterThan' | 'greaterThanEqual' | 'lessThan' | 'lessThanEqual'

export type FormulaFunctionKind = 'Set' | 'Lambda'

export type ViewType = string
export type ViewAttrs = Record<string, any>

export type ViewRender = (attrs: ViewAttrs, data: VariableDisplayData) => React.ReactElement

export interface View {
  type: ViewType
  render: ViewRender
}

export interface ViewData<T extends ViewType> {
  type: T
  attrs: ViewAttrs
}
export interface BaseResult {
  result: any
  view?: ViewData<ViewType>
  type: Exclude<FormulaType, 'void'>
  subType?: FormulaType
  errorKind?: ErrorType
  operator?: PredicateOperator
}
export interface NumberResult extends BaseResult {
  result: number
  type: 'number'
}

export interface BooleanResult extends BaseResult {
  result: boolean
  type: 'boolean'
}

export interface StringResult extends BaseResult {
  result: string
  type: 'string'
}

export interface NullResult extends BaseResult {
  result: null
  type: 'null'
}

export interface BlankResult extends BaseResult {
  result: never
  type: 'Blank'
}

export interface ArrayResult extends BaseResult {
  result: AnyTypeResult[]
  type: 'Array'
  subType: FormulaType
}

export interface RecordType {
  [key: string]: AnyTypeResult
}

export interface RecordResult extends BaseResult {
  result: RecordType
  subType: FormulaType
  type: 'Record'
}

export interface DateResult extends BaseResult {
  result: Date
  type: 'Date'
}

export interface ColumnResult extends BaseResult {
  result: ColumnType
  type: 'Column'
}

export interface RowResult extends BaseResult {
  result: RowType
  type: 'Row'
}

export interface CellResult extends BaseResult {
  result: CellType
  type: 'Cell'
}

export interface RangeResult extends BaseResult {
  result: RangeType
  type: 'Range'
}

export interface SpreadsheetResult extends BaseResult {
  result: SpreadsheetType
  type: 'Spreadsheet'
}

export interface BlockResult extends BaseResult {
  result: BlockType
  type: 'Block'
}

export interface ErrorResult extends BaseResult {
  result: string
  type: 'Error'
  errorKind: ErrorType
}

export interface PredicateResult extends BaseResult {
  type: 'Predicate'
  result: NumberResult | StringResult
  column?: ColumnType
  operator: PredicateOperator
}
interface FormulaFunction {
  name: FormulaFunctionKind
  args: Array<ReferenceResult | CstResult>
}

export interface FunctionResult extends BaseResult {
  type: 'Function'
  result: [FormulaFunction, ...FormulaFunction[]]
}

export interface CstResult extends BaseResult {
  type: 'Cst'
  result: CstNode
}

export interface ReferenceResult extends BaseResult {
  type: 'Reference'
  result: Reference
}

export interface ButtonResult extends BaseResult {
  type: 'Button'
  result: ButtonType
}

export interface InputResult extends BaseResult {
  type: 'Input'
  result: InputType
}

export interface SwitchResult extends BaseResult {
  type: 'Switch'
  result: SwitchType
}

export interface SelectResult extends BaseResult {
  type: 'Select'
  result: SelectType
}

export interface PendingResult extends BaseResult {
  result: string
  type: 'Pending'
}

export interface WaitingResult extends BaseResult {
  result: string
  type: 'Waiting'
}

export interface NoPersistResult extends BaseResult {
  result: null
  type: 'NoPersist'
}

export interface AnyResult extends BaseResult {
  result: any
  type: 'any'
}

export type Reference = VariableReference | SelfReference

interface BaseReference {
  attribute?: string
  kind: 'variable' | 'self'
}

interface VariableReference extends BaseReference {
  kind: 'variable'
  variableId: VariableId
  namespaceId: NamespaceId
}

interface SelfReference extends BaseReference {
  kind: 'self'
}

export type AnyTypeResult =
  | NumberResult
  | BooleanResult
  | StringResult
  | NullResult
  | RecordResult
  | BlankResult
  | ArrayResult
  | DateResult
  | ColumnResult
  | RowResult
  | RangeResult
  | CellResult
  | SpreadsheetResult
  | BlockResult
  | PredicateResult
  | ButtonResult
  | SwitchResult
  | SelectResult
  | InputResult
  | ErrorResult
  | FunctionResult
  | CstResult
  | ReferenceResult
  | PendingResult
  | WaitingResult
  | NoPersistResult

export type AnyFunctionResult<T> = (AnyTypeResult & { type: T }) | ErrorResult

export type FormulaSourceType = 'normal' | 'spreadsheet'
export interface BaseFormula {
  blockId: uuid
  definition: string
  id: uuid
  name: VariableName
  cacheValue: BaseResult
  version: number
  type: string
}

export interface DeleteFormula {
  blockId: uuid
  id: uuid
}

export interface Formula extends BaseFormula {
  definition: Definition
  type: FormulaSourceType
}

export interface FormulaWithTime extends Formula {
  updatedAt: string
  createdAt: number
}

export interface Argument {
  readonly name: string
  readonly type: FormulaType
  readonly default?: AnyTypeResult
  readonly spread?: boolean
}

export type CompletionKind = 'function' | 'variable' | 'spreadsheet' | 'column' | 'block'
export type ComplexCodeFragmentType = 'Spreadsheet' | 'Column' | 'Variable' | 'Block' | 'UUID'
export type SimpleCodeFragmentType =
  | 'FunctionName'
  | 'Function'
  | 'StringLiteral'
  | 'NumberLiteral'
  | 'BooleanLiteral'
  | 'NullLiteral'
  | 'Dot'
  | 'Equal'
export type SpecialCodeFragmentType = 'unknown' | 'parseErrorOther' | 'Space' | 'literal'
export type CodeFragmentCodes = ComplexCodeFragmentType | SimpleCodeFragmentType | SpecialCodeFragmentType

interface BaseCompletion {
  readonly kind: CompletionKind
  readonly weight: number
  readonly replacements: string[]
  readonly namespace: string
  readonly positionChange: number
  readonly name: string
  readonly value: any
  readonly preview: any
  readonly renderDescription: (blockId: NamespaceId) => string
  readonly codeFragments: CodeFragment[]
}
export interface FunctionCompletion extends BaseCompletion {
  readonly kind: 'function'
  readonly namespace: FunctionGroup
  readonly value: `${FunctionKey}()`
  readonly preview: FunctionClause<FormulaType>
}

export interface VariableCompletion extends BaseCompletion {
  readonly kind: 'variable'
  readonly namespace: BlockName
  readonly value: VariableKey
  readonly preview: VariableInterface
}

export interface ColumnCompletion extends BaseCompletion {
  readonly kind: 'column'
  readonly namespace: SpreadsheetName
  readonly value: ColumnKey
  readonly preview: ColumnType
}
export interface BlockCompletion extends BaseCompletion {
  readonly kind: 'block'
  readonly namespace: BlockName
  readonly value: BlockKey
  readonly preview: BlockType
}
export interface SpreadsheetCompletion extends BaseCompletion {
  readonly kind: 'spreadsheet'
  readonly namespace: BlockName
  readonly value: BlockKey
  readonly preview: SpreadsheetType
}

export type Completion =
  | FunctionCompletion
  | VariableCompletion
  | SpreadsheetCompletion
  | ColumnCompletion
  | BlockCompletion

export interface FormulaNameToken {
  image: string
  type: string
}

export interface BaseFormulaName {
  kind: ComplexCodeFragmentType
  renderTokens: (namespaceIsExist: boolean, namespaceId: NamespaceId) => FormulaNameToken[]
  key: string
  name: string
  namespaceId: string
}

export interface VariableFormulaName extends BaseFormulaName {
  kind: 'Variable'
  name: VariableName
  key: VariableId
}

export interface BlockFormulaName extends BaseFormulaName {
  kind: 'Block'
  name: BlockName
  key: NamespaceId
}

export interface SpreadsheetFormulaName extends BaseFormulaName {
  kind: 'Spreadsheet'
  name: SpreadsheetName
  key: NamespaceId
}

export type FormulaName = VariableFormulaName | BlockFormulaName | SpreadsheetFormulaName

export interface DirtyFormulaInfo {
  updatedAt: Date
}
export interface ContextInterface {
  features: string[]
  spreadsheets: Record<NamespaceId, SpreadsheetType>
  formulaNames: FormulaName[]
  dirtyFormulas: Record<VariableKey, DirtyFormulaInfo>
  reservedNames: string[]
  reverseVariableDependencies: Record<VariableKey, VariableDependency[]>
  reverseFunctionDependencies: Record<FunctionKey, VariableDependency[]>
  invoke: (name: FunctionNameType, ctx: FunctionContext, ...args: any[]) => Promise<AnyTypeResult>
  backendActions: BackendActions | undefined
  variableCount: () => number
  findFormulaName: (namespaceId: NamespaceId) => FormulaName | undefined
  getDefaultVariableName: (namespaceId: NamespaceId, type: FormulaType) => DefaultVariableName
  completions: (namespaceId: NamespaceId, variableId: VariableId | undefined) => Completion[]
  findViewRender: (viewType: ViewType) => ViewRender | undefined
  findSpreadsheet: (namespaceId: NamespaceId) => SpreadsheetType | undefined
  findColumnById: (namespaceId: NamespaceId, variableId: VariableId) => ColumnType | undefined
  findColumnByName: (namespaceId: NamespaceId, name: ColumnName) => ColumnType | undefined
  setSpreadsheet: (spreadsheet: SpreadsheetType) => void
  removeSpreadsheet: (namespaceId: NamespaceId) => void
  listVariables: (namespaceId: NamespaceId) => VariableInterface[]
  findVariableById: (namespaceId: NamespaceId, variableId: VariableId) => VariableInterface | undefined
  findVariableByName: (namespaceId: NamespaceId, name: string) => VariableInterface | undefined
  commitVariable: ({ variable }: { variable: VariableInterface }) => void
  removeVariable: (namespaceId: NamespaceId, variableId: VariableId) => Promise<void>
  findFunctionClause: (group: FunctionGroup, name: FunctionNameType) => FunctionClause<FormulaType> | undefined
  resetFormula: VoidFunction
}

interface TestCase {
  readonly input: any[]
  readonly output: any
}

interface Example<T extends FormulaType> {
  readonly input: Definition
  readonly output: AnyFunctionResult<T> | null
}

export interface BaseFunctionContext {
  readonly formulaContext: ContextInterface
  readonly meta?: VariableMetadata
}
export interface FunctionContext extends BaseFunctionContext {
  readonly meta: VariableMetadata
  readonly interpretContext: InterpretContext
}

export interface InterpretContext {
  readonly ctx: RecordType
  readonly arguments: AnyTypeResult[]
}

type FunctionReference<T extends FormulaType> =
  | {
      readonly reference: (ctx: FunctionContext, ...args: any[]) => Promise<AnyFunctionResult<T>>
      readonly async: true
      readonly chain: false
    }
  | {
      readonly reference: (ctx: FunctionContext, ...args: any[]) => AnyFunctionResult<T>
      readonly async: false
      readonly chain: false
    }
  | {
      readonly reference: (ctx: FunctionContext, chainResult: any, ...args: any[]) => Promise<AnyFunctionResult<T>>
      readonly async: true
      readonly chain: true
    }
  | {
      readonly reference: (ctx: FunctionContext, chainResult: any, ...args: any[]) => AnyFunctionResult<T>
      readonly async: false
      readonly chain: true
    }

type FunctionChain =
  | {
      readonly chain: false
    }
  | {
      readonly chain: true
      readonly args: [Argument, ...Argument[]]
    }

export type BaseFunctionClause<T extends FormulaType> = {
  readonly name: FunctionNameType
  readonly pure: boolean
  readonly effect: boolean
  readonly persist: boolean
  readonly feature?: Feature
  readonly lazy: boolean
  readonly acceptError: boolean
  readonly description: string
  readonly group: FunctionGroup
  readonly examples: [Example<T>, ...Array<Example<T>>]
  readonly args: Argument[]
  readonly returns: T
  readonly testCases: TestCase[]
} & FunctionReference<T> &
  FunctionChain

export type BaseFunctionClauseWithKey<T extends FormulaType> = BaseFunctionClause<T> & {
  readonly key: FunctionKey
}

export interface ExampleWithCodeFragments<T extends FormulaType> extends Example<T> {
  readonly codeFragments: CodeFragment[]
}

export type FunctionClause<T extends FormulaType> = Omit<BaseFunctionClauseWithKey<T>, 'examples'> & {
  readonly examples: [ExampleWithCodeFragments<T>, ...Array<ExampleWithCodeFragments<T>>]
}

export interface BaseCodeFragment {
  readonly code: CodeFragmentCodes
  readonly value: string
  readonly display: string
  readonly renderText: undefined | ((text: string, attrs: CodeFragment, prevText: string) => string)
  readonly hide: boolean
  readonly type: FormulaType
  readonly errors: ErrorMessage[]
}
export interface SpecialCodeFragment extends BaseCodeFragment {
  readonly code: ComplexCodeFragmentType
  readonly attrs: CodeFragmentAttrs
}
export interface OtherCodeFragment extends BaseCodeFragment {
  readonly code: Exclude<CodeFragmentCodes, ComplexCodeFragmentType>
  readonly attrs: undefined
}

export interface CodeFragmentAttrs {
  readonly kind: ComplexCodeFragmentType
  readonly namespaceId: NamespaceId
  readonly id: uuid
  readonly name: string
}

export type CodeFragment = SpecialCodeFragment | OtherCodeFragment

export interface CodeFragmentResult {
  readonly codeFragments: CodeFragment[]
  readonly type: FormulaType
  readonly image: string
}

export interface VariableDependency {
  readonly variableId: VariableId
  readonly namespaceId: NamespaceId
}

export interface VariableNameDependency {
  readonly namespaceId: NamespaceId
  readonly name: string
}

interface BaseVariableValue {
  readonly success: boolean
  readonly result: AnyTypeResult
}

interface SuccessVariableValue extends BaseVariableValue {
  readonly success: true
  readonly result: AnyTypeResult
}

interface ErrorVariableValue extends BaseVariableValue {
  readonly success: false
  readonly result: ErrorResult
}

export type VariableValue = SuccessVariableValue | ErrorVariableValue
export interface VariableDisplayData {
  definition: Definition
  result: AnyTypeResult
  kind: VariableKind
  type: FormulaSourceType
  version: number
  meta: VariableMetadata
  display: string
}

export interface BaseVariableTask {
  async: boolean
  uuid: string
  execStartTime: Date
  execEndTime: Date | undefined
  variableValue: VariableValue | Promise<VariableValue>
}

export interface AsyncVariableTask extends BaseVariableTask {
  async: true
  execEndTime: undefined
  variableValue: Promise<VariableValue>
}

export interface SyncVariableTask extends BaseVariableTask {
  async: false
  execEndTime: Date
  variableValue: VariableValue
}

export type VariableTask = AsyncVariableTask | SyncVariableTask
export interface VariableData {
  definition: Definition
  isAsync: boolean
  isEffect: boolean
  isPure: boolean
  isPersist: boolean
  task: VariableTask
  kind: VariableKind
  type: FormulaSourceType
  name: VariableName
  version: number
  namespaceId: NamespaceId
  variableId: VariableId
  valid: boolean
  cst?: CstNode
  codeFragments: CodeFragment[]
  flattenVariableDependencies: VariableDependency[]
  variableNameDependencies: VariableNameDependency[]
  variableDependencies: VariableDependency[]
  blockDependencies: NamespaceId[]
  functionDependencies: Array<FunctionClause<FormulaType>>
}
export interface VariableMetadata {
  readonly namespaceId: NamespaceId
  readonly variableId: VariableId
  readonly input: string
  readonly position: number
  readonly name: VariableName
  readonly type: FormulaSourceType
}

export interface VariableInterface {
  t: VariableData
  savedT: VariableData | undefined
  isNew: boolean
  formulaContext: ContextInterface

  buildFormula: () => Formula
  clearDependency: VoidFunction
  trackDependency: VoidFunction
  trackDirty: VoidFunction
  save: VoidFunction
  namespaceName: (pageId: NamespaceId) => string
  updateDefinition: (definition: Definition) => void
  meta: () => VariableMetadata
  onUpdate: (skipPersist?: boolean) => void
}

export interface BackendActions {
  commit: (commitFormulas: Formula[], deleteFormulas: DeleteFormula[]) => Promise<{ success: boolean }>
}

export interface ErrorMessage {
  readonly message: string
  readonly type: ErrorType
}
