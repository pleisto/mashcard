import { TestCaseInterface, TestCaseName } from '../../testType'
import { BasicTypeTestCase } from './basicType'

export const BasicTestCase: TestCaseInterface[] = [BasicTypeTestCase]

export const BasicNames: TestCaseName[] = BasicTestCase.map(c => c.name)
