import { TestCaseInterface, TestCaseName } from '../../testType'
import { AttrsCompleteTestCase } from './attrsComplete'
import { BlockCompleteTestCase } from './blockComplete'
import { FunctionCompleteTestCase } from './functionComplete'
import { SpreadsheetCompleteTestCase } from './spreadsheetComplete'
import { VariableCompleteTestCase } from './variableComplete'

export const CompleteTestCase: TestCaseInterface[] = [
  BlockCompleteTestCase,
  FunctionCompleteTestCase,
  SpreadsheetCompleteTestCase,
  VariableCompleteTestCase,
  AttrsCompleteTestCase
]

export const CompleteNames: TestCaseName[] = CompleteTestCase.map(c => c.name)
