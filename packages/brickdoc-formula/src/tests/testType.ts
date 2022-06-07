import { FixedLengthTuple, Repeat, RequireField } from '@brickdoc/active-support'
import { FormulaContextArgs } from '../context'
import { Cell } from '../controls'
import { OperatorName } from '../grammar'
import { ErrorType, FormulaDefinition, FunctionContext, VariableMetadata, VariableParseResult } from '../types'

export const DEFAULT_FIRST_NAMESPACEID = '00000000-0000-0000-0000-000000000000'
const uuids = [...Array(999)].map(
  (o, index) => `00000000-0000-${String(index).padStart(4, '0')}-0000-000000000000` as const
)
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

type Characters = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | 'a' | 'b' | 'c' | 'd' | 'e' | 'f'
type UUIDPart4<U, N extends number> = U extends string ? Repeat<U, N> : never
type FirstSubPart4 = UUIDPart4<Exclude<Characters, '0'>, 4>

type FirstPart12<T1 extends string = FirstSubPart4, T2 extends string = FirstSubPart4> = T1 extends T2
  ? T2 extends T1
    ? `${T1}${T1}-${T1}`
    : never
  : never

export type MockedUUIDV4 =
  | `${FirstPart12}-${UUIDPart4<Characters, 4>}-${UUIDPart4<Characters, 4>}-${UUIDPart4<Characters, 12>}`
  | symbol

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
type FeatureName = 'async' | 'functionCall' | 'nameCheck' | 'powerfx' | 'spreadsheet' | 'variable' | 'dependency'
type FeatureTestName = 'complete' | 'cst'
export type TestCaseName = OperatorName | FeatureName | FeatureTestName

interface GroupOption {
  name: TestCaseName
  options?: any
}

export interface BaseTestCase<T extends object> {
  definition?: string
  groupOptions?: GroupOption[]
  label?: string
  expected?: [ExpectedType<T>, ...Array<ExpectedType<T>>]
  namespaceId?: MockedUUIDV4
  variableId?: MockedUUIDV4
  name?: VariableMetadata['name']
  richType?: VariableMetadata['richType']
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

interface DependencyTestCase {
  action: 'updateDefinition' | 'removeVariable'
  formula: FormulaDefinition
  result: any
  expected: BaseTestCase<{
    namespaceId: MockedUUIDV4
    name: VariableMetadata['name']
  }>['expected'] & {}
}

export interface DependencyTestCaseType extends RequireField<BaseTestCase<{}>, 'namespaceId' | 'name'> {
  testCases: [DependencyTestCase, ...DependencyTestCase[]]
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

export interface TestCaseType {
  functionClauses?: FormulaContextArgs['functionClauses']
  pages?: PageInput[]
  successTestCases?: SuccessTestCaseType[]
  errorTestCases?: ErrorTestCaseType[]
  dependencyTestCases?: DependencyTestCaseType[]
}

export interface TestCaseInput {
  options: RequireField<MakeContextOptions, 'initializeOptions' | 'pages'>
  successTestCases: Array<RequireField<SuccessTestCaseType, 'groupOptions' | 'jestTitle'>>
  errorTestCases: Array<RequireField<ErrorTestCaseType, 'groupOptions' | 'jestTitle'>>
  dependencyTestCases: Array<RequireField<DependencyTestCaseType, 'groupOptions' | 'jestTitle'>>
}
