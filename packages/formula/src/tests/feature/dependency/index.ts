import { TestCaseInterface, TestCaseName } from '../../testType'
import { SpreadsheetDependencyTestCase } from './spreadsheetDependency'
import { VariableDependencyTestCase } from './variableDependency'

export const DependencyTestCase: TestCaseInterface[] = [VariableDependencyTestCase, SpreadsheetDependencyTestCase]

export const DependencyNames: TestCaseName[] = DependencyTestCase.map(c => c.name)
