import { TestCaseInterface, TestCaseName } from '../../testType'
import { BasicErrorTestCase } from './basicError'
import { BasicTypeTestCase } from './basicType'

export const BasicTestCase: TestCaseInterface[] = [BasicTypeTestCase, BasicErrorTestCase]

export const BasicNames: TestCaseName[] = BasicTestCase.map(c => c.name)
