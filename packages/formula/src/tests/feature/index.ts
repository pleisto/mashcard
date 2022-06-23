import { TestCaseInterface } from '../testType'
import { AsyncTestCase } from './async'
import { DependencyTestCase } from './dependency'
import { FunctionCallTestCase } from './functionCall'
import { NameTestCase } from './name'
import { OtherTestCase } from './other'
import { PowerFxTestCase } from './powerfx'
import { SpreadsheetTestCase } from './spreadsheet'
import { VariableTestCase } from './variable'
import { EventTestCases } from './event'
import { CompleteTestCase } from './complete'

export const FeatureTestCases: TestCaseInterface[] = [
  FunctionCallTestCase,
  VariableTestCase,
  PowerFxTestCase,
  SpreadsheetTestCase,
  NameTestCase,
  AsyncTestCase,
  DependencyTestCase,
  OtherTestCase,
  ...EventTestCases,
  ...CompleteTestCase
]
