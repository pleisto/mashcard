import { CstNode } from 'chevrotain'
import { ButtonType, InputType, ColumnType, SpreadsheetType, SelectType, SwitchType, BlockType } from '../controls'

type FormulaBasicType = 'number' | 'string' | 'boolean' | 'null'
type FormulaObjectType =
  | 'Date'
  | 'Column'
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

export type FormulaType = FormulaBasicType | FormulaObjectType | FormulaControlType | 'any' | 'void'

export type FormulaCheckType = FormulaType | [FormulaType, ...FormulaType[]]

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

export type FunctionGroup = 'core' | 'custom' | string

export type FunctionNameType = string
export type VariableName = string
export type ColumnName = string
export type SpreadsheetName = string

export type Definition = string

export type VariableKind = 'constant' | 'expression'

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
  | 'custom'

export type ParseErrorType = 'parse' | 'syntax'

export type FunctionKey = `${FunctionGroup}::${FunctionNameType}` | FunctionNameType
export type FunctionCompletionValue = FunctionKey | `${FunctionKey}()`
export type VariableKey = `#${NamespaceId}@${VariableId}`
export type BlockKey = `#${NamespaceId}`
export type ColumnKey = `#${NamespaceId}#${ColumnId}`

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
export interface BaseResult {
  result: any
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
  result: AnyTypeResult
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
  | AnyResult

export type AnyFunctionResult<T> = (AnyTypeResult & { type: T }) | ErrorResult

export interface View {
  [key: string]: any
}

export interface Formula {
  blockId: uuid
  definition: string
  id: uuid
  name: VariableName
  cacheValue: BaseResult
  level: number
  version: number
  kind: string
  view: View
  dependencyIds: uuid[]
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

export type CompletionKind = 'function' | 'variable' | 'spreadsheet' | 'column'

interface BaseCompletion {
  readonly kind: CompletionKind
  readonly weight: number
  readonly replacements: string[]
  readonly namespace: string
  readonly name: string
  readonly value: any
  readonly preview: any
  readonly renderDescription: (blockId: NamespaceId) => string
  readonly codeFragment: CodeFragment
}
export interface FunctionCompletion extends BaseCompletion {
  readonly kind: 'function'
  readonly namespace: FunctionGroup
  readonly value: FunctionCompletionValue
  readonly preview: FunctionClause<any>
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

export interface SpreadsheetCompletion extends BaseCompletion {
  readonly kind: 'spreadsheet'
  readonly namespace: BlockName
  readonly value: BlockKey
  readonly preview: SpreadsheetType
}

export type Completion = FunctionCompletion | VariableCompletion | SpreadsheetCompletion | ColumnCompletion

export interface FormulaName {
  kind: SpecialCodeFragmentType
  value: string
  key: string
  name: string
  render: RenderCodeFragmentFunction
}

export interface ContextInterface {
  features: string[]
  spreadsheets: Record<NamespaceId, SpreadsheetType>
  formulaNames: FormulaName[]
  reservedNames: string[]
  invoke: (name: FunctionNameType, ctx: FunctionContext, ...args: any[]) => Promise<AnyTypeResult>
  backendActions: BackendActions | undefined
  variableCount: () => number
  getDefaultVariableName: (namespaceId: NamespaceId, type: FormulaType) => DefaultVariableName
  completions: (namespaceId: NamespaceId, variableId: VariableId | undefined) => Completion[]
  findSpreadsheet: (namespaceId: NamespaceId) => SpreadsheetType | undefined
  findColumn: (namespaceId: NamespaceId, variableId: VariableId) => ColumnType | undefined
  setSpreadsheet: (spreadsheet: SpreadsheetType) => void
  removeSpreadsheet: (namespaceId: NamespaceId) => void
  listVariables: (namespaceId: NamespaceId) => VariableInterface[]
  findVariable: (namespaceId: NamespaceId, variableId: VariableId) => VariableInterface | undefined
  clearDependency: (namespaceId: NamespaceId, variableId: VariableId) => void
  trackDependency: (variable: VariableInterface) => void
  handleBroadcast: (variable: VariableInterface) => void
  commitVariable: ({ variable, skipCreate }: { variable: VariableInterface; skipCreate?: boolean }) => Promise<void>
  removeVariable: (namespaceId: NamespaceId, variableId: VariableId) => Promise<void>
  findFunctionClause: (group: FunctionGroup, name: FunctionNameType) => FunctionClause<any> | undefined
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

export interface ExampleWithCodeFragments<T extends FormulaType> extends Example<T> {
  readonly codeFragments: CodeFragment[]
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

export interface BaseFunctionClause<T extends FormulaType> {
  readonly name: FunctionNameType
  readonly pure: boolean
  readonly effect: false
  readonly feature?: Feature
  readonly lazy: boolean
  readonly async: false
  readonly chain: boolean
  readonly acceptError: boolean
  readonly description: string
  readonly group: FunctionGroup
  readonly examples: [Example<T>, ...Array<Example<T>>]
  readonly args: Argument[]
  readonly returns: T
  readonly testCases: TestCase[]
  readonly reference: (ctx: FunctionContext, ...args: any[]) => AnyFunctionResult<T> | Promise<AnyFunctionResult<T>>
}

export interface NormalFunctionClause<T extends FormulaType> extends BaseFunctionClause<T> {
  readonly chain: false
}

// TODO reference argument type!
export interface ChainFunctionClause<T extends FormulaType> extends BaseFunctionClause<T> {
  readonly chain: true
  readonly returns: T
  readonly args: [Argument, ...Argument[]]
  readonly reference: (
    ctx: FunctionContext,
    chainResult: any,
    ...args: any[]
  ) => AnyFunctionResult<T> | Promise<AnyFunctionResult<T>>
}

export type BasicFunctionClause<T extends FormulaType> = NormalFunctionClause<T> | ChainFunctionClause<T>

export interface BaseFunctionClauseWithKey<T extends FormulaType> extends BaseFunctionClause<T> {
  readonly key: FunctionKey
}

export interface FunctionClause<T extends FormulaType> extends BaseFunctionClauseWithKey<T> {
  readonly examples: [ExampleWithCodeFragments<T>, ...Array<ExampleWithCodeFragments<T>>]
}

export interface FormulaCodeFragmentAttrs {
  readonly display: string
  readonly value: string
  readonly code: string
  readonly type: FormulaType
  readonly error: string
}

export type RenderCodeFragmentFunction = (
  blockId: NamespaceId
) => [FormulaCodeFragmentAttrs, ...FormulaCodeFragmentAttrs[]]

interface BaseCodeFragment {
  readonly code: string
  readonly name: string
  readonly spaceBefore: boolean
  readonly namespaceId?: NamespaceId
  readonly spaceAfter: boolean
  readonly render?: RenderCodeFragmentFunction
  readonly type: FormulaType
  readonly errors: ErrorMessage[]
}

export type SpecialCodeFragmentType = 'Spreadsheet' | 'Column' | 'Variable' | 'Block'

export interface SpecialCodeFragment extends BaseCodeFragment {
  readonly code: SpecialCodeFragmentType
  readonly render: RenderCodeFragmentFunction
  readonly namespaceId: NamespaceId
}

export interface OtherCodeFragment extends BaseCodeFragment {
  readonly code: Exclude<string, SpecialCodeFragmentType>
  readonly render: undefined
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

interface BaseVariableValue {
  updatedAt: Date
  readonly success: boolean
  readonly result: AnyTypeResult
  readonly cacheValue: BaseResult
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

export interface VariableData {
  name: VariableName
  level: number
  version: number
  namespaceId: NamespaceId
  variableId: VariableId
  definition: Definition
  dirty: boolean
  valid: boolean
  view: View
  kind: VariableKind
  variableValue: VariableValue
  cst?: CstNode
  codeFragments: CodeFragment[]
  flattenVariableDependencies: VariableDependency[]
  variableDependencies: VariableDependency[]
  blockDependencies: NamespaceId[]
  functionDependencies: Array<FunctionClause<any>>
}

export interface VariableMetadata {
  readonly namespaceId: NamespaceId
  readonly variableId: VariableId
  readonly input: string
  readonly name: VariableName
}

export interface VariableInterface {
  t: VariableData
  buildFormula: () => Formula
  destroy: () => Promise<void>
  save: () => Promise<void>
  isDraft: () => boolean
  namespaceName: () => string
  reparse: VoidFunction
  updateDefinition: (definition: Definition) => Promise<void>
  meta: () => VariableMetadata
  updateCst: (cst: CstNode, context: InterpretContext) => void
  invokeBackendCreate: () => Promise<void>
  invokeBackendUpdate: () => Promise<void>
  afterUpdate: VoidFunction
  interpret: (context: InterpretContext) => Promise<void>
  updateAndPersist: () => Promise<void>
  refresh: (context: InterpretContext) => Promise<void>
}

export interface BackendActions {
  createVariable: (formula: Formula) => Promise<{ success: boolean }>
  updateVariable: (formula: Formula) => Promise<{ success: boolean }>
  deleteVariable: (formula: Formula) => Promise<{ success: boolean }>
}

export interface ErrorMessage {
  readonly message: string
  readonly type: ErrorType
}
