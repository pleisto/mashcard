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
export type BlockKey = `#${NamespaceId}`
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

export type ViewType = FormulaType | 'Qrcode'
export interface View<T extends ViewType> {
  type: T
  attrs: Record<string, any>
}
export interface BaseResult {
  result: any
  view?: View<ViewType>
  type: Exclude<FormulaType, 'void'>
  subType?: FormulaType
  errorKind?: ErrorType
  operator?: PredicateOperator
}
export interface NumberResult extends BaseResult {
  result: number
  view?: View<'number'>
  type: 'number'
}

export interface BooleanResult extends BaseResult {
  result: boolean
  view?: View<'boolean'>
  type: 'boolean'
}

export interface StringResult extends BaseResult {
  result: string
  view?: View<'string' | 'Qrcode'>
  type: 'string'
}

export interface NullResult extends BaseResult {
  result: null
  view?: View<'null'>
  type: 'null'
}

export interface BlankResult extends BaseResult {
  result: never
  view?: View<'Blank'>
  type: 'Blank'
}

export interface ArrayResult extends BaseResult {
  result: AnyTypeResult[]
  view?: View<'Array'>
  type: 'Array'
  subType: FormulaType
}

export interface RecordType {
  [key: string]: AnyTypeResult
}

export interface RecordResult extends BaseResult {
  result: RecordType
  subType: FormulaType
  view?: View<'Record'>
  type: 'Record'
}

export interface DateResult extends BaseResult {
  result: Date
  view?: View<'Date'>
  type: 'Date'
}

export interface ColumnResult extends BaseResult {
  result: ColumnType
  view?: View<'Column'>
  type: 'Column'
}

export interface SpreadsheetResult extends BaseResult {
  result: SpreadsheetType
  view?: View<'Spreadsheet'>
  type: 'Spreadsheet'
}

export interface BlockResult extends BaseResult {
  result: BlockType
  view?: View<'Block'>
  type: 'Block'
}

export interface ErrorResult extends BaseResult {
  result: string
  type: 'Error'
  view?: View<'Error'>
  errorKind: ErrorType
}

export interface PredicateResult extends BaseResult {
  type: 'Predicate'
  view?: View<'Predicate'>
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
  view?: View<'Function'>
  result: [FormulaFunction, ...FormulaFunction[]]
}

export interface CstResult extends BaseResult {
  type: 'Cst'
  view?: View<'Cst'>
  result: CstNode
}

export interface ReferenceResult extends BaseResult {
  type: 'Reference'
  view?: View<'Reference'>
  result: Reference
}

export interface ButtonResult extends BaseResult {
  type: 'Button'
  view?: View<'Button'>
  result: ButtonType
}

export interface InputResult extends BaseResult {
  type: 'Input'
  view?: View<'Input'>
  result: InputType
}

export interface SwitchResult extends BaseResult {
  type: 'Switch'
  view?: View<'Switch'>
  result: SwitchType
}

export interface SelectResult extends BaseResult {
  type: 'Select'
  view?: View<'Select'>
  result: SelectType
}

export interface AnyResult extends BaseResult {
  result: any
  view?: View<'any'>
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
export type ComplexCodeFragmentType = 'Spreadsheet' | 'Column' | 'Variable' | 'Block'
export type SimpleCodeFragmentType =
  | 'FunctionName'
  | 'Function'
  | 'StringLiteral'
  | 'NumberLiteral'
  | 'BooleanLiteral'
  | 'NullLiteral'
  | 'Dot'
  | 'Equal'
export type SpecialCodeFragmentType = 'unknown' | 'other' | 'Space'
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
  renderTokens: (namespaceIsExist: boolean) => FormulaNameToken[]
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

export interface ContextInterface {
  features: string[]
  spreadsheets: Record<NamespaceId, SpreadsheetType>
  formulaNames: FormulaName[]
  reservedNames: string[]
  reverseVariableDependencies: Record<VariableKey, VariableDependency[]>
  reverseFunctionDependencies: Record<FunctionKey, VariableDependency[]>
  invoke: (name: FunctionNameType, ctx: FunctionContext, ...args: any[]) => Promise<AnyTypeResult>
  backendActions: BackendActions | undefined
  variableCount: () => number
  findFormulaName: (namespaceId: NamespaceId) => FormulaName | undefined
  getDefaultVariableName: (namespaceId: NamespaceId, type: FormulaType) => DefaultVariableName
  completions: (namespaceId: NamespaceId, variableId: VariableId | undefined) => Completion[]
  findSpreadsheet: (namespaceId: NamespaceId) => SpreadsheetType | undefined
  findColumnById: (namespaceId: NamespaceId, variableId: VariableId) => ColumnType | undefined
  findColumnByName: (namespaceId: NamespaceId, name: ColumnName) => ColumnType | undefined
  setSpreadsheet: (spreadsheet: SpreadsheetType) => void
  removeSpreadsheet: (namespaceId: NamespaceId) => void
  listVariables: (namespaceId: NamespaceId) => VariableInterface[]
  findVariable: (namespaceId: NamespaceId, variableId: VariableId) => VariableInterface | undefined
  findVariableByName: (namespaceId: NamespaceId, name: string) => VariableInterface | undefined
  commitVariable: ({ variable, skipCreate }: { variable: VariableInterface; skipCreate?: boolean }) => Promise<void>
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

export interface VariableResult {
  definition: Definition
  variableValue: VariableValue
  kind: VariableKind
  type: FormulaSourceType
}
export interface VariableData extends VariableResult {
  name: VariableName
  version: number
  namespaceId: NamespaceId
  variableId: VariableId
  dirty: boolean
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
  formulaContext: ContextInterface
  buildFormula: () => Formula
  clone: () => VariableInterface
  clearDependency: VoidFunction
  trackDependency: VoidFunction
  destroy: () => Promise<void>
  save: () => Promise<void>
  reparseOnly: VoidFunction
  isDraft: () => boolean
  namespaceName: () => string
  updateDefinition: (definition: Definition) => Promise<void>
  meta: () => VariableMetadata
  result: () => VariableResult
  updateCst: (cst: CstNode, context: InterpretContext) => void
  invokeBackendCreate: () => Promise<void>
  invokeBackendUpdate: () => Promise<void>
  afterUpdate: VoidFunction
  interpret: (context: InterpretContext) => Promise<void>
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
