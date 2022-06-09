import { FixedLengthTuple, RequireField } from '@brickdoc/active-support'
import { FormulaContextArgs } from '../context'
import { Cell } from '../controls'
import { OperatorName } from '../grammar'
import { ErrorType, FormulaDefinition, FunctionContext, VariableMetadata, VariableParseResult } from '../types'

export const DEFAULT_FIRST_NAMESPACEID = '00000000-0000-0000-0000-000000000000'
const uuids = [...Array(999)].map((o, index) => `00000000-0000-${String(index).padStart(4, '0')}-0000-000000000000`)
export const DEFAULT_UUID_FUNCTION: UUIDState['uuidFunction'] = index => {
  const uuid = uuids[index]
  if (!uuid) throw new Error('uuid not found')
  return uuid
}

type Match =
  | { matchType?: 'toStrictEqual'; match: any }
  | { matchType: 'toMatchObject'; match: any }
  | { matchType: 'toMatchSnapshot'; match?: any }

type ExpectedType<T extends object> = T & Match

export interface InsertOptions {
  ignoreParseError?: true
  ignoreSyntaxError?: true
}

interface VariableInput {
  variableName: string
  variableId?: MockedUUIDV4
  definition: string
  position?: number
  insertOptions?: InsertOptions
  result?: any
}

export type MockedUUIDV4 = symbol | string

export interface UUIDState {
  uuidFunction: (number: number) => string
  counter: number
  cache: Record<symbol, string>
}

export interface ColumnInput<RowCount extends number> {
  columnId?: MockedUUIDV4
  name: string
  displayIndex?: string
  cells: FixedLengthTuple<CellInput, RowCount>
}

export interface CellInput extends Pick<Cell, 'value'> {
  cellId?: MockedUUIDV4
}

export interface RowInput {
  rowId?: MockedUUIDV4
}
export interface SpreadsheetInput<ColumnCount extends number, RowCount extends number> {
  spreadsheetId?: MockedUUIDV4
  name: string
  columns: FixedLengthTuple<ColumnInput<RowCount>, ColumnCount>
  rows?: FixedLengthTuple<RowInput, RowCount>
}
export interface PageInput {
  pageId?: MockedUUIDV4
  pageName: string
  variables?: VariableInput[]
  spreadsheets?: Array<SpreadsheetInput<any, any>>
}
type FeatureName =
  | 'async'
  | 'functionCall'
  | 'nameCheck'
  | 'powerfx'
  | 'spreadsheet'
  | 'variable'
  | 'dependency'
  | 'other'
type FeatureTestName = 'complete' | 'cst'
export type TestCaseName = OperatorName | FeatureName | FeatureTestName

export type GroupOption =
  | {
      name: Exclude<TestCaseName, 'complete'>
      options?: any
    }
  | {
      name: 'complete'
      options: object
    }

export interface BaseTestCase<T extends object> {
  definition?: string
  newAbbrevInput?: string
  groupOptions?: GroupOption[]
  currentGroupOption?: any
  label?: string
  expected?: [ExpectedType<T>, ...Array<ExpectedType<T>>]
  namespaceId?: MockedUUIDV4
  variableId?: MockedUUIDV4
  name?: VariableMetadata['name']
  richType?: VariableMetadata['richType']
  position?: VariableMetadata['position']
  todo?: string
  jestTitle?: string
}
export interface SuccessTestCaseType
  extends RequireField<BaseTestCase<{ key: keyof VariableParseResult }>, 'definition'> {
  result: any
}

export interface ErrorTestCaseType
  extends RequireField<BaseTestCase<{ key: keyof VariableParseResult }>, 'definition'> {
  valid?: boolean
  errorType: ErrorType
  errorMessage: string
}

type DependencyTypes = 'Variable' | 'Block'

interface DependencyActionConfig {
  Variable:
    | {
        name: 'updateDefinition'
        formula: FormulaDefinition
        result: any
      }
    | {
        name: 'removeVariable'
      }
  Block: {
    name: 'removeBlock'
  }
}

type DependencyTestCase<T extends DependencyTypes> = {
  expected: NonNullable<
    BaseTestCase<{
      namespaceId: MockedUUIDV4
      definition?: string
      name: VariableMetadata['name']
    }>['expected']
  >
} & { action: DependencyActionConfig[T] }
export interface DependencyTestCaseType<T extends DependencyTypes>
  extends RequireField<BaseTestCase<{}>, 'namespaceId' | 'name'> {
  type: T
  testCases: [DependencyTestCase<T>, ...Array<DependencyTestCase<T>>]
}

export interface TestCaseInterface {
  name: TestCaseName
  testCases: TestCaseType
}

export interface MakeContextOptions {
  initializeOptions?: FormulaContextArgs
  uuidFunction?: UUIDState['uuidFunction']
  pages: PageInput[]
}

export interface MakeContextResult extends Omit<FunctionContext, 'meta'> {
  buildMeta: (args: BaseTestCase<{}>) => FunctionContext['meta']
  fetchUUID: (uuid: MockedUUIDV4) => string
}

type AnyDependencyTestCaseType = { [K in DependencyTypes]: DependencyTestCaseType<K> }[DependencyTypes]

export interface TestCaseType {
  functionClauses?: FormulaContextArgs['functionClauses']
  pages?: PageInput[]
  successTestCases?: SuccessTestCaseType[]
  errorTestCases?: ErrorTestCaseType[]
  dependencyTestCases?: AnyDependencyTestCaseType[]
}

export interface TestCaseInput {
  options: RequireField<MakeContextOptions, 'initializeOptions' | 'pages'>
  successTestCases: Array<RequireField<SuccessTestCaseType, 'groupOptions' | 'jestTitle'>>
  errorTestCases: Array<RequireField<ErrorTestCaseType, 'groupOptions' | 'jestTitle'>>
  dependencyTestCases: Array<RequireField<AnyDependencyTestCaseType, 'groupOptions' | 'jestTitle'>>
}
