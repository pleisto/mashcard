import { EventType } from '@brickdoc/schema'
import { CstNode } from 'chevrotain'
import {
  ButtonType,
  InputType,
  ColumnType,
  SpreadsheetType,
  SelectType,
  SwitchType,
  BlockType,
  RowType,
  RangeType,
  CellType
} from '../controls'
import { PositionFragment } from '../grammar'

type FormulaBasicType = 'number' | 'string' | 'boolean' | 'null'
type FormulaObjectType = 'Date' | 'Block' | 'Blank' | 'Record' | 'Array' | 'Error'

type FormulaSpreadsheetType = 'Spreadsheet' | 'Row' | 'Cell' | 'Column' | 'Range'
type FormulaComplexType = 'Cst' | 'Reference' | 'Function' | 'Predicate'

export type FormulaControlType = 'Button' | 'Switch' | 'Select' | 'Input' | 'Radio' | 'Rate' | 'Slider'

type UnusedFormulaControlType = 'Radio' | 'Rate' | 'Slider'

export type FormulaType =
  | FormulaBasicType
  | FormulaObjectType
  | FormulaControlType
  | FormulaComplexType
  | FormulaSpreadsheetType
  | 'literal'
  | 'any'
  | 'void'
  | 'Pending'
  | 'Waiting'
  | 'NoPersist'

export type PersistFormulaType = Exclude<
  FormulaType,
  'any' | 'void' | 'Blank' | 'Range' | FormulaControlType | FormulaComplexType
>

type UsedFormulaType = Exclude<FormulaType, 'any' | 'void' | UnusedFormulaControlType>

export type FormulaCheckType = FormulaType | [FormulaType, ...FormulaType[]]

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
  subType?: FormulaType
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
  | SelectResult
  | InputResult
  | ErrorResult
  | FunctionResult
  | CstResult
  | ReferenceResult
  | PendingResult
  | WaitingResult
  | NoPersistResult

export type AnyTypeResult = UsedFormulaType extends AnyResult['type'] ? AnyResult : never

export type TypedResult<T extends FormulaType> = Extract<AnyTypeResult, { type: T }>

export type AnyFunctionResult<T extends FormulaType> = TypedResult<T> | ErrorResult

export type FormulaSourceType = 'normal' | 'spreadsheet'
export interface BaseFormula {
  blockId: uuid
  definition: string
  meta: object
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

export type Formula = BaseFormula & {
  definition: Definition
}

export interface Argument {
  readonly name: string
  readonly type: FormulaType
  readonly default?: AnyTypeResult
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
export type SimpleCodeFragmentType =
  | 'FunctionName'
  | 'Function'
  | 'FunctionGroup'
  | 'DoubleColon'
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
  readonly value: SpreadsheetKey
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
  setBlock: (blockId: NamespaceId, name: string) => void
  removeBlock: (blockId: NamespaceId) => void
  setName: (nameDependency: NameDependencyWithKind) => void
  removeName: (id: NamespaceId) => void
  findNames: (namespaceId: NamespaceId, name: string) => NameDependencyWithKind[]
  findSpreadsheet: (key: FindKey) => SpreadsheetType | undefined
  findColumn: (spreadsheetId: SpreadsheetId, key: FindKey) => ColumnType | undefined
  findRow: (spreadsheetId: SpreadsheetId, key: FindKey) => RowType | undefined
  setSpreadsheet: (spreadsheet: SpreadsheetType) => void
  removeSpreadsheet: (spreadsheetId: SpreadsheetId) => void
  listVariables: (namespaceId: NamespaceId) => VariableInterface[]
  findVariableById: (namespaceId: NamespaceId, variableId: VariableId) => VariableInterface | undefined
  findVariableByName: (namespaceId: NamespaceId, name: string) => VariableInterface | undefined
  commitVariable: ({ variable }: { variable: VariableInterface }) => void
  removeVariable: (namespaceId: NamespaceId, variableId: VariableId) => Promise<void>
  findFunctionClause: (group: FunctionGroup, name: FunctionNameType) => FunctionClause<FormulaType> | undefined
  resetFormula: VoidFunction
  cleanup: VoidFunction
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
  readonly valuePrefix?: string
  readonly display: string
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
  readonly findKey: FindKey
}

export type CodeFragment = SpecialCodeFragment | OtherCodeFragment

export interface CodeFragmentStepInput {
  codeFragments: CodeFragment[]
  positionFragment: PositionFragment
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
  readonly type: FormulaType
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
  readonly runtimeEventDependencies?: EventDependency[]
}

interface SuccessVariableValue extends BaseVariableValue {
  readonly success: true
  readonly runtimeEventDependencies: EventDependency[]
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

export interface EventScope {
  rows?: string[]
  columns?: string[]
}

export interface EventDependency {
  readonly kind: 'SpreadsheetName' | 'ColumnName' | 'Spreadsheet' | 'Column' | 'Row' | 'Cell'
  readonly event: EventType<any>
  readonly eventId: string
  readonly scope: EventScope
  readonly key: string
  readonly definitionHandler?: (deps: EventDependency, variable: VariableInterface, payload: any) => string | undefined
  readonly cleanup?: EventDependency
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
  richType: VariableRichType
  name: VariableName
  version: number
  namespaceId: NamespaceId
  variableId: VariableId
  valid: boolean
  cst?: CstNode
  codeFragments: CodeFragment[]
  flattenVariableDependencies: VariableDependency[]
  nameDependencies: NameDependency[]
  variableDependencies: VariableDependency[]
  blockDependencies: NamespaceId[]
  eventDependencies: EventDependency[]
  functionDependencies: Array<FunctionClause<FormulaType>>
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
  readonly name: VariableName
  readonly richType: VariableRichType
}

export interface VariableInterface {
  t: VariableData
  savedT: VariableData | undefined
  isNew: boolean
  currentUUID: string
  formulaContext: ContextInterface

  buildFormula: (definition?: string) => Formula
  cleanup: (hard: boolean) => void
  trackDependency: VoidFunction
  trackDirty: VoidFunction
  save: VoidFunction
  nameDependency: () => NameDependencyWithKind
  namespaceName: (pageId: NamespaceId) => string
  updateDefinition: (definition: Definition) => void
  meta: () => VariableMetadata
  onUpdate: ({
    skipPersist,
    tNotMatched,
    savedTNotMatched
  }: {
    skipPersist?: boolean
    tNotMatched?: boolean
    savedTNotMatched?: boolean
  }) => void
}

export interface BackendActions {
  commit: (commitFormulas: Formula[], deleteFormulas: DeleteFormula[]) => Promise<{ success: boolean }>
}

export interface ErrorMessage {
  readonly message: string
  readonly type: ErrorType
}
