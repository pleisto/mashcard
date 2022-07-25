import { TestCaseInterface, TestCaseName } from '../../testType'
import { VariableDependencyTestCase } from './variableDependency'

export const DependencyTestCase: TestCaseInterface[] = [VariableDependencyTestCase]

export const DependencyNames: TestCaseName[] = DependencyTestCase.map(c => c.name)
