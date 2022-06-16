import { TestCaseInterface } from '../testType'
import { AsyncTestCase } from './async'
import { VariableCompleteTestCase } from './variableComplete'
import { DependencyTestCase } from './dependency'
import { FunctionCallTestCase } from './functionCall'
import { NameTestCase } from './name'
import { OtherTestCase } from './other'
import { PowerFxTestCase } from './powerfx'
import { SpreadsheetTestCase } from './spreadsheet'
import { VariableTestCase } from './variable'
import { BlockCompleteTestCase } from './blockComplete'
import { SpreadsheetCompleteTestCase } from './spreadsheetComplete'
import { FunctionCompleteTestCase } from './functionComplete'
import { BlockEventTestCase } from './blockEvent'
import { VariableEventTestCase } from './variableEvent'
import { SpreadsheetEventTestCase } from './spreadsheetEvent'

export const FeatureTestCases: TestCaseInterface[] = [
  FunctionCallTestCase,
  VariableTestCase,
  PowerFxTestCase,
  SpreadsheetTestCase,
  NameTestCase,
  AsyncTestCase,
  DependencyTestCase,
  VariableCompleteTestCase,
  BlockCompleteTestCase,
  SpreadsheetCompleteTestCase,
  FunctionCompleteTestCase,
  BlockEventTestCase,
  VariableEventTestCase,
  SpreadsheetEventTestCase,
  OtherTestCase
]
