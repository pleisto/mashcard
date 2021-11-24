import { CstNode } from 'chevrotain'

export * from './grammar'
export * from './functions'
export * from './context'

export type BasicType = 'number' | 'string' | 'boolean' | 'object' | 'array'
export type ObjectType = 'Date' | 'Column'

export type ArgumentType = BasicType | ObjectType | 'any'

export type FunctionGroup = 'core' | 'excel' | 'custom'

export type VariableKind = 'constant' | 'expression'

export type VariableTypeMeta = `error_${VariableKind}` | `success_${VariableKind}_${ArgumentType}`

export type Result = any

export interface View {
  [key: string]: any
}

export interface Formula {
  blockId: uuid
  definition: string
  id: uuid
  name: string
  updatedAt: string
  createdAt: number
  cacheValue: object
  view: View
}

export type Cell = any

export type Column = unknown
export interface Database {
  size: () => void
  getColumn: (columnId: uuid) => Column | null
  getColumnData: (columnId: uuid) => Cell[]
  // getRow: (rowId: uuid) => Cell[]
  getCell: (columnId: uuid, rowId: uuid) => Cell | null
}

export interface Argument {
  readonly name: string
  readonly type: ArgumentType
  readonly spread?: boolean
}

export interface Example {
  readonly input: any[]
  readonly output: Result
}

export interface ContextInterface {
  variableCount: () => number
  findDatabase: (namespaceId: namespaceId) => Database | undefined
  findColumn: (namespaceId: namespaceId, variableId: variableId) => Column | undefined
  setDatabase: (namespaceId: namespaceId, database: Database) => void
  removeDatabase: (namespaceId: namespaceId) => void
  findVariable: (namespaceId: namespaceId, variableId: variableId) => VariableInterface | undefined
  findVariableByName: (namespaceId: namespaceId, name: string) => VariableInterface | undefined
  clearDependency: (namespaceId: namespaceId, variableId: variableId) => void
  trackDependency: (data: VariableData) => void
  handleBroadcast: (variable: VariableInterface) => void
  commitVariable: ({ variable, skipCreate }: { variable: VariableInterface; skipCreate?: boolean }) => Promise<void>
  removeVariable: (namespaceId: namespaceId, variableId: variableId) => Promise<void>
  findFunctionClause: (group: string, name: string) => FunctionClause | undefined
  reset: () => void
  variableKey: (namespaceId: namespaceId, variableId: variableId) => string
  functionKey: (group: string, name: string) => string
}

export interface BaseFunctionClause {
  readonly name: string
  readonly pure: boolean
  readonly effect: boolean
  readonly async: boolean
  readonly description: string
  readonly group: FunctionGroup
  readonly args: Argument[]
  readonly chain: boolean
  readonly returns: ArgumentType
  readonly examples: Example[]
  readonly reference: (ctx: ContextInterface, ...args: any[]) => Result
}

export interface NormalFunctionClause extends BaseFunctionClause {
  readonly chain: false
}

export interface ChainFunctionClause extends BaseFunctionClause {
  readonly chain: true
  readonly args: [Argument, ...Argument[]]
  readonly reference: (ctx: ContextInterface, chainResult: any, ...args: any[]) => Result
}

export type FunctionClause = NormalFunctionClause | ChainFunctionClause

export interface CodeFragment {
  readonly code: string
  readonly name: string
  readonly error?: ErrorMessage
}

type uuid = string

export type namespaceId = uuid
export type variableId = uuid

export interface VariableDependency {
  readonly variableId: variableId
  readonly namespaceId: namespaceId
}

export interface BaseVariableValue {
  updatedAt: Date
  readonly success: boolean
  readonly value?: Result
  readonly display?: string
  readonly type?: ArgumentType
  readonly errorMessages?: ErrorMessage[]
}

export interface SuccessVariableValue extends BaseVariableValue {
  readonly success: true
  readonly display: string
  readonly value: Result
  readonly type: ArgumentType
}

export interface ErrorVariableValue extends BaseVariableValue {
  readonly success: false
  readonly errorMessages: [ErrorMessage, ...ErrorMessage[]]
}

export type VariableValue = SuccessVariableValue | ErrorVariableValue

export interface VariableData {
  name: string
  namespaceId: namespaceId
  variableId: variableId
  definition: string
  dirty: boolean
  view?: View
  kind: VariableKind
  variableValue: VariableValue
  cst: CstNode
  codeFragments?: CodeFragment[]
  variableDependencies: VariableDependency[]
  functionDependencies: FunctionClause[]
}

export type UpdateHandler = (data: VariableData) => void

export interface VariableMetadata {
  readonly namespaceId: namespaceId
  readonly variableId: variableId
  readonly input: string
  readonly name: string
}

export interface VariableInterface {
  t: VariableData
  backendActions: BackendActions
  meta: () => VariableMetadata
  onUpdate: (handler: UpdateHandler) => void
  invokeBackendCreate: () => Promise<void>
  invokeBackendUpdate: () => Promise<void>
  afterUpdate: () => void
  refresh: (formulaContext: ContextInterface) => Promise<void>
}

export interface BackendActions {
  createVariable: (variable: VariableInterface) => Promise<{ success: boolean }>
  updateVariable: (variable: VariableInterface) => Promise<{ success: boolean }>
  deleteVariable: (variable: VariableInterface) => Promise<{ success: boolean }>
}

export interface Context {
  [key: `$${namespaceId}@${variableId}`]: VariableInterface
}

export type ErrorType = 'type' | 'syntax' | 'runtime' | 'fatal' | 'deps' | 'circular_dependency'
export interface ErrorMessage {
  readonly message: string
  readonly type: ErrorType
}
