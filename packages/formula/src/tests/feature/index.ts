import { TestCaseInterface } from '../testType'
import { AsyncTestCase } from './async'
import { FunctionCallTestCase } from './functionCall'
import { ParserTestCase } from './parser'
import { OtherTestCase } from './other'
import { PowerFxTestCase } from './powerfx'
import { SpreadsheetTestCase } from './spreadsheet'
import { VariableTestCase } from './variable'
import { EventTestCases } from './event'
import { CompleteTestCase } from './complete'
import { FormatTestCase } from './format'
import { BasicTestCase } from './basic'
import { SpreadsheetVariableTestCase } from './spreadsheetVariable'
import { DependencyTestCase } from './dependency'

export const FeatureTestCases: TestCaseInterface[] = [
  FunctionCallTestCase,
  VariableTestCase,
  SpreadsheetVariableTestCase,
  PowerFxTestCase,
  SpreadsheetTestCase,
  ParserTestCase,
  AsyncTestCase,
  FormatTestCase,
  OtherTestCase,
  ...BasicTestCase,
  ...EventTestCases,
  ...CompleteTestCase,
  ...DependencyTestCase
]

export { BasicNames } from './basic'
export { CompleteNames } from './complete'
export { EventNames } from './event'
export { DependencyNames } from './dependency'
