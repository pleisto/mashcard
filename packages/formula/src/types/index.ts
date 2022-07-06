import { RequireField } from '@mashcard/active-support'
import { EventType } from '@mashcard/schema'
import { CstNode } from 'chevrotain'
import {
  ButtonType,
  ColumnType,
  SpreadsheetType,
  SwitchType,
  BlockType,
  RowType,
  RangeType,
  CellType
} from '../controls'

const FORMULA_BASIC_TYPES = ['number', 'string', 'boolean', 'null'] as const
const FORMULA_OBJECT_TYPES = ['Date', 'Block', 'Blank', 'Record', 'Array', 'Error'] as const
const FORMULA_SPREADSHEET_TYPES = ['Spreadsheet', 'Row', 'Cell', 'Column', 'Range'] as const
const FORMULA_COMPLEX_TYPES = ['Cst', 'Reference', 'Function', 'Predicate'] as const
const FORMULA_CONTROL_TYPES = ['Button', 'Switch'] as const
const FORMULA_OTHER_TYPES = ['literal', 'Pending', 'Waiting', 'NoPersist'] as const

export const FORMULA_USED_TYPES = [
  ...FORMULA_BASIC_TYPES,
  ...FORMULA_OBJECT_TYPES,
  ...FORMULA_SPREADSHEET_TYPES,
  ...FORMULA_COMPLEX_TYPES,
  ...FORMULA_CONTROL_TYPES,
  ...FORMULA_OTHER_TYPES
] as const
const FORMULA_TYPES = [...FORMULA_USED_TYPES, 'any', 'void'] as const

export const CORE_FUNCTION_GROUPS = ['core'] as const
export type CoreFunctionGroup = typeof CORE_FUNCTION_GROUPS[number]

type FormulaComplexType = typeof FORMULA_COMPLEX_TYPES[number]
export type FormulaControlType = typeof FORMULA_CONTROL_TYPES[number]
export type FormulaType = typeof FORMULA_TYPES[number]
type UsedFormulaType = typeof FORMULA_USED_TYPES[number]

export type PersistFormulaType = Exclude<
  FormulaType,
  'any' | 'void' | 'Blank' | 'Range' | FormulaControlType | FormulaComplexType
>

export type FormulaCheckType = FormulaType | readonly [FormulaType, ...FormulaType[]]

type FormulaCodeFragmentType = 'TRUE' | 'FALSE' | 'Function' | 'Variable' | 'FunctionName' | 'LogicColumn' | 'LogicRow'

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

export type FunctionGroup = CoreFunctionGroup | string

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
export type SpreadsheetKey = `#${NamespaceId}.${SpreadsheetId}`

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
export type SpreadsheetId = uuid
export type RowId = uuid

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
  meta?: any
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

export interface LiteralResult extends BaseResult {
  result: string
  type: 'literal'
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
  meta: FormulaType
}

export interface RecordType {
  [key: string]: AnyTypeResult
}

export interface RecordResult extends BaseResult {
  result: RecordType
  meta: FormulaType
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
  meta: ErrorType
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

export interface SwitchResult extends BaseResult {
  type: 'Switch'
  result: SwitchType
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

type AnyResult =
  | NumberResult
  | BooleanResult
  | StringResult
  | LiteralResult
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
  | ErrorResult
  | FunctionResult
  | CstResult
  | ReferenceResult
  | PendingResult
  | WaitingResult
  | NoPersistResult

// Ensure that the result type is valid
export type AnyTypeResult = UsedFormulaType extends AnyResult['type'] ? AnyResult : never

export type TypedResult<T extends FormulaType> = Extract<AnyTypeResult, { type: T }>

export type AnyFunctionResult<T extends FormulaType> = TypedResult<T> | ErrorResult

export type FormulaResult<T extends FormulaType> = TypedResult<T>['result']

export type FormulaSourceType = 'normal' | 'spreadsheet'

export interface FormulaDefinition {
  definition?: string
  meta?: object
  name?: VariableName
}
export interface BaseFormula extends Required<FormulaDefinition> {
  blockId: uuid
  id: uuid
  cacheValue: BaseResult
  version: number
  type: string
}

export interface DeleteFormula {
  blockId: uuid
  id: uuid
}

export type Formula = BaseFormula & {
  definition: Definition
}

export interface Argument<T extends UsedFormulaType = UsedFormulaType> {
  readonly name: string
  readonly type: T | readonly [T, ...T[]]
  readonly default?: TypedResult<T>
  readonly spread?: boolean
}

export type CompletionKind = 'function' | 'variable' | 'spreadsheet' | 'column' | 'block'
export type ComplexCodeFragmentType =
  | 'Spreadsheet'
  | 'Column'
  | 'Variable'
  | 'Block'
  | 'UUID'
  | 'LogicColumn'
  | 'Row'
  | 'LogicRow'
  | 'ThisRow'
  | 'ThisRecord'

export const OPERATOR_TYPES = [
  'Plus',
  'Minus',
  'Multi',
  'Div',
  'Ampersand',
  'Caret',
  'Equal2',
  'Equal',
  'NotEqual2',
  'NotEqual',
  'And',
  'Or',
  'GreaterThan',
  'LessThanEqual',
  'GreaterThanEqual',
  'LessThan',
  'ExactIn',
  'In'
] as const

export type SimpleCodeFragmentType =
  | typeof OPERATOR_TYPES[number]
  | 'FunctionName'
  | 'Function'
  | 'FunctionGroup'
  | 'DoubleColon'
  | 'StringLiteral'
  | 'NumberLiteral'
  | 'BooleanLiteral'
  | 'NullLiteral'
  | 'Dot'
  | 'LParen'
  | 'RParen'
  | 'LBracket'
  | 'RBracket'
  | 'LBrace'
  | 'RBrace'
  | 'Not'
  | 'Comma'
  | 'Semicolon'
export type SpecialCodeFragmentType =
  | 'unknown'
  | 'parseErrorOther1'
  | 'parseErrorOther2'
  | 'parseErrorOther3'
  | 'Space'
  | 'literal'
export type CodeFragmentCodes = ComplexCodeFragmentType | SimpleCodeFragmentType | SpecialCodeFragmentType

interface CompletionReplacement {
  readonly matcher: string
  readonly value: string
  readonly positionOffset?: number
}

export type CompletionFlag =
  | 'exact'
  | 'dynamicColumn'
  | 'compareTypeMatched'
  | 'compareTypeNotMatched'
  | 'chainTypeMatched'
  | 'chainTypeNotMatched'
  | 'contextNamespace'
  | 'defaultNamespace'
  | 'blockNamespace'
  | 'chainNamespace'
  | 'block'
  | 'variable'
  | 'spreadsheet'
  | 'column'
  | 'function'
  | 'variable'
  | 'nameEqual'
  | 'nameIncludes'
  | 'nameStartsWith'
  | 'functionNameEqual'
  | 'functionNameIncludes'
  | 'functionNameStartsWith'

interface BaseCompletion {
  readonly kind: CompletionKind
  readonly weight: number
  readonly flags: CompletionFlag[]
  readonly replacements: CompletionReplacement[]
  readonly fallbackValue: string
  readonly fallbackPositionOffset?: number
  readonly name: string
  readonly preview: any
  readonly namespaceId?: NamespaceId
}
export interface FunctionCompletion extends BaseCompletion {
  readonly kind: 'function'
  readonly preview: AnyFunctionClause
}

export interface VariableCompletion extends BaseCompletion {
  readonly kind: 'variable'
  readonly preview: VariableInterface
}

export interface ColumnCompletion extends BaseCompletion {
  readonly kind: 'column'
  readonly preview: ColumnType
}
export interface BlockCompletion extends BaseCompletion {
  readonly kind: 'block'
  readonly preview: BlockType
}
export interface SpreadsheetCompletion extends BaseCompletion {
  readonly kind: 'spreadsheet'
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
export interface DirtyFormulaInfo {
  updatedAt: Date
}

export interface FindKey {
  namespaceId: NamespaceId
  type: 'id' | 'name'
  value: string
}

export interface ContextInterface {
  domain: string
  features: string[]
  dirtyFormulas: Record<VariableKey, DirtyFormulaInfo>
  reservedNames: string[]
  reverseVariableDependencies: Record<VariableKey, VariableDependency[]>
  reverseFunctionDependencies: Record<FunctionKey, VariableDependency[]>
  invoke: (name: FunctionNameType, ctx: FunctionContext, ...args: any[]) => Promise<AnyTypeResult>
  backendActions: BackendActions | undefined
  variableCount: () => number
  getDefaultVariableName: (namespaceId: NamespaceId, type: FormulaType) => DefaultVariableName
  completions: (namespaceId: NamespaceId, variableId: VariableId | undefined) => Completion[]
  findViewRender: (viewType: ViewType) => ViewRender | undefined
  findBlockById: (blockId: NamespaceId) => BlockType | undefined
  removeBlock: (blockId: NamespaceId) => Promise<void>
  setName: (nameDependency: NameDependencyWithKind) => Promise<void>
  removeName: (id: NamespaceId) => Promise<void>
  findNames: (namespaceId: NamespaceId, name: string) => NameDependencyWithKind[]
  findSpreadsheet: (key: FindKey) => SpreadsheetType | undefined
  findColumn: (spreadsheetId: SpreadsheetId, key: FindKey) => ColumnType | undefined
  findRow: (spreadsheetId: SpreadsheetId, key: FindKey) => RowType | undefined
  findReference: (namespaceId: NamespaceId, variableId: VariableId) => VariableDependency[]
  setSpreadsheet: (spreadsheet: SpreadsheetType) => Promise<void>
  removeSpreadsheet: (spreadsheetId: SpreadsheetId) => Promise<void>
  listVariables: (namespaceId: NamespaceId) => VariableInterface[]
  findVariableById: (namespaceId: NamespaceId, variableId: VariableId) => VariableInterface | undefined
  findVariableDisplayDataById: (namespaceId: NamespaceId, variableId: VariableId) => VariableDisplayData | undefined
  findVariableByName: (namespaceId: NamespaceId, name: string) => VariableInterface | undefined
  commitVariable: ({ variable }: { variable: VariableInterface }) => Promise<void>
  removeVariable: (namespaceId: NamespaceId, variableId: VariableId) => Promise<void>
  findFunctionClause: (group: FunctionGroup, name: FunctionNameType) => AnyFunctionClauseWithKeyAndExample | undefined
  resetFormula: VoidFunction
  cleanup: VoidFunction
}

interface Example<T extends FormulaType> {
  readonly input: Definition
  readonly output: AnyFunctionResult<T> | null
  readonly codeFragments?: CodeFragment[]
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

type FormulaArgumentsType<Chain extends boolean> = [
  ...args: Chain extends true ? [firstArgs: Argument, ...args: Argument[]] : [...args: Argument[]]
]

type FlattenType<
  T extends UsedFormulaType | readonly UsedFormulaType[],
  R extends UsedFormulaType = never
> = T extends UsedFormulaType
  ? T
  : T extends [infer First, ...infer Other]
  ? Other extends UsedFormulaType[]
    ? First extends UsedFormulaType
      ? FlattenType<Other, R | First>
      : never
    : never
  : R

type ArgumentArrayToResultTypeArray<
  Arguments extends Argument[],
  AcceptError extends boolean,
  R extends Array<TypedResult<any>> = []
> = Arguments extends [infer First, ...infer Other]
  ? Other extends Argument[]
    ? First extends Argument
      ? ArgumentArrayToResultTypeArray<
          Other,
          AcceptError,
          [
            ...R,
            TypedResult<AcceptError extends true ? FlattenType<First['type']> | 'Error' : FlattenType<First['type']>>
          ]
        >
      : never
    : never
  : R

type ArgumentArrayToDataTypeArray<
  Arguments extends Argument[],
  AcceptError extends boolean,
  R extends Array<FormulaResult<any>> = []
> = Arguments extends [infer First, ...infer Other]
  ? Other extends Argument[]
    ? First extends Argument
      ? ArgumentArrayToDataTypeArray<
          Other,
          AcceptError,
          [
            ...R,
            FormulaResult<AcceptError extends true ? FlattenType<First['type']> | 'Error' : FlattenType<First['type']>>
          ]
        >
      : never
    : never
  : R

interface TestCase<T extends FormulaType, Input extends Array<FormulaResult<any>>> {
  readonly input: Input
  readonly output: AnyFunctionResult<T>
}

export interface AnyFunctionClause<T extends UsedFormulaType = any> {
  readonly name: FunctionNameType
  readonly key?: FunctionKey
  readonly async: boolean
  readonly chain: boolean
  readonly pure: boolean
  readonly effect: boolean
  readonly persist: boolean
  readonly feature?: Feature
  readonly lazy: boolean
  readonly acceptError: boolean
  readonly description: string
  readonly group: FunctionGroup
  readonly examples: [Example<T>, ...Array<Example<T>>]
  readonly returns: T | readonly [T, ...T[]]
  readonly args: Argument[]
  readonly testCases: Array<{
    readonly input: Array<FormulaResult<any>>
    readonly output: AnyFunctionResult<T>
  }>
  readonly reference: (ctx: FunctionContext, ...args: any[]) => Promise<AnyFunctionResult<T>> | AnyFunctionResult<T>
}

export interface FunctionClause<
  T extends UsedFormulaType,
  Async extends boolean,
  Chain extends boolean,
  AcceptError extends boolean,
  Arguments extends FormulaArgumentsType<Chain> = FormulaArgumentsType<Chain>
> {
  readonly name: FunctionNameType
  readonly key?: FunctionKey
  readonly async: Async
  readonly chain: Chain
  readonly pure: boolean
  readonly effect: boolean
  readonly persist: boolean
  readonly feature?: Feature
  readonly lazy: boolean
  readonly acceptError: AcceptError
  readonly description: string
  readonly group: FunctionGroup
  readonly examples: [Example<T>, ...Array<Example<T>>]
  readonly returns: T | readonly [T, ...T[]]
  readonly args: Arguments
  readonly testCases: Array<TestCase<T, ArgumentArrayToDataTypeArray<Arguments, AcceptError>>>
  readonly reference: (
    ctx: FunctionContext,
    ...args: ArgumentArrayToResultTypeArray<Arguments, AcceptError>
  ) => Async extends true ? Promise<AnyFunctionResult<T>> : AnyFunctionResult<T>
}

export const createFunctionClause = <
  Return extends UsedFormulaType | readonly [UsedFormulaType, ...UsedFormulaType[]],
  Async extends boolean,
  Chain extends boolean,
  AcceptError extends boolean,
  Arguments extends FormulaArgumentsType<Chain>,
  RealReturn extends UsedFormulaType = FlattenType<Return>
>(
  t: FunctionClause<RealReturn, Async, Chain, AcceptError, Arguments>
): FunctionClause<RealReturn, Async, Chain, AcceptError, Arguments> => t

export type AnyFunctionClauseWithKeyAndExample = RequireField<AnyFunctionClause, 'key'>

export interface BaseCodeFragment {
  readonly code: CodeFragmentCodes
  readonly display: string
  readonly replacements?: [string, ...string[]]
  readonly namespaceId?: string
  readonly type: FormulaType
  readonly errors: ErrorMessage[]
  readonly meta?: any
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
  readonly findKey: FindKey
}

export type CodeFragment = SpecialCodeFragment | OtherCodeFragment

export interface CodeFragmentStepInput {
  codeFragments: CodeFragment[]
}

export type CodeFragmentStep = ({
  input,
  meta
}: {
  input: CodeFragmentStepInput
  meta: VariableMetadata
}) => CodeFragmentStepInput

export interface CodeFragmentResult {
  readonly codeFragments: CodeFragment[]
  readonly type: FormulaCheckType
  readonly image: string
}

export interface VariableDependency {
  readonly variableId: VariableId
  readonly namespaceId: NamespaceId
}

export interface NameDependency {
  readonly namespaceId: NamespaceId
  readonly name: string
}

export interface NameDependencyWithKind extends NameDependency {
  readonly id: uuid
  readonly kind: 'Block' | 'Variable' | 'Spreadsheet'
  readonly renderTokens: (namespaceIsExist: boolean, namespaceId: NamespaceId) => FormulaNameToken[]
}

interface BaseVariableValue {
  readonly success: boolean
  readonly result: AnyTypeResult
  readonly runtimeEventDependencies?: Array<EventDependency<FormulaEventPayload<any>>>
}

interface SuccessVariableValue extends BaseVariableValue {
  readonly success: true
  readonly runtimeEventDependencies: Array<EventDependency<FormulaEventPayload<any>>>
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

export interface EventScope {
  rows?: string[]
  columns?: string[]
}

export interface FormulaEventPayload<T> {
  readonly key: string
  readonly level?: number
  readonly username: string
  readonly scope: EventScope | null
  readonly id: string
  readonly namespaceId: string
  readonly meta: T
}

export interface EventDependency<T extends FormulaEventPayload<any>> {
  readonly kind:
    | 'SpreadsheetName'
    | 'ColumnName'
    | 'Spreadsheet'
    | 'Column'
    | 'Row'
    | 'Cell'
    | 'Variable'
    | 'NameChange'
    | 'NameRemove'
    | 'BlockRename'
    | 'BlockDelete'
  readonly event: EventType<T, Promise<void>>
  readonly eventId: string
  readonly scope: EventScope
  readonly key: string
  readonly skipIf?: (variable: VariableInterface, payload: T) => boolean
  readonly definitionHandler?: (deps: EventDependency<T>, variable: VariableInterface, payload: T) => string | undefined
  readonly cleanup?: EventDependency<FormulaEventPayload<any>>
}

export type VariableTask = AsyncVariableTask | SyncVariableTask
export interface VariableParseResult {
  definition: Definition
  position: number
  async: boolean
  effect: boolean
  pure: boolean
  persist: boolean
  kind: VariableKind
  version: number
  valid: boolean
  cst: CstNode | undefined
  codeFragments: CodeFragment[]
  flattenVariableDependencies: VariableDependency[]
  nameDependencies: NameDependency[]
  variableDependencies: VariableDependency[]
  blockDependencies: NamespaceId[]
  eventDependencies: Array<EventDependency<FormulaEventPayload<any>>>
  functionDependencies: AnyFunctionClauseWithKeyAndExample[]
}
export interface VariableData {
  meta: Pick<VariableMetadata, 'namespaceId' | 'variableId' | 'name' | 'richType'>
  variableParseResult: VariableParseResult
  task: VariableTask
}

export type VariableRichType = {
  readonly type: FormulaSourceType
} & (
  | {
      readonly type: 'normal'
      readonly meta?: undefined
    }
  | {
      readonly type: 'spreadsheet'
      readonly meta: {
        readonly spreadsheetId: SpreadsheetId
        readonly columnId: ColumnId
        readonly rowId: uuid
      }
    }
)

export interface VariableMetadata {
  readonly namespaceId: NamespaceId
  readonly variableId: VariableId
  readonly input: string
  readonly position: number
  name: VariableName
  readonly richType: VariableRichType
}

export interface VariableInterface {
  t: VariableData
  isReadyT: boolean
  isNew: boolean
  id: string
  currentUUID: string
  formulaContext: ContextInterface

  buildFormula: (input?: FormulaDefinition) => Formula
  cleanup: () => Promise<void>
  trackDependency: () => Promise<void>
  trackDirty: VoidFunction
  save: () => Promise<void>
  nameDependency: () => NameDependencyWithKind
  namespaceName: (pageId: NamespaceId) => string
  updateDefinition: (input: FormulaDefinition) => Promise<void>
  meta: () => VariableMetadata
  onUpdate: ({ skipPersist }: { skipPersist?: boolean }) => Promise<void>
}

export interface BackendActions {
  commit: (commitFormulas: Formula[], deleteFormulas: DeleteFormula[]) => Promise<{ success: boolean }>
}

export interface ErrorMessage {
  readonly message: string
  readonly type: ErrorType
}
