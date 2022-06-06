import { OPERATORS } from '../grammar'
import { FeatureTestCases } from './feature'
import { TestCaseInput, TestCaseInterface, TestCaseName } from './testType'

export const NAME_SPECIAL_INVALID_CHARS = [...'()[]{}!@#$%^&*-+=|\\:;\'"<>,./?`~', ' ', '\t', '\n', '\r', '\u2003']
export const NAME_VALID_SUFFIX_ONLY = ['中文', 'é', '😉', '1', '감사']
export const BUILTIN_STRINGS = ['in', 'EXACTIN', 'true', 'False', 'and', 'not', 'Null', 'Or']
export const NAME_VALID_PREFIX = ['a', '_', ...BUILTIN_STRINGS]

const reduceTestCaseInput = (testCases: TestCaseInterface[]): TestCaseInput => {
  return testCases.reduce<TestCaseInput>(
    (prev, curr) => ({
      options: {
        pages: [...prev.options.pages, ...(curr.testCases.pages ?? [])],
        initializeOptions: {
          ...prev.options.initializeOptions,
          functionClauses: [
            ...(prev.options.initializeOptions.functionClauses ?? []),
            ...(curr.testCases.functionClauses ?? [])
          ]
        }
      },
      successTestCases: [
        ...prev.successTestCases,
        ...(curr.testCases.successTestCases ?? [])
          .map(s => ({ ...s, groupOptions: [{ name: curr.name }, ...(s.groupOptions ?? [])] }))
          .map(s => ({
            ...s,
            jestTitle: `${s.label ? `[${s.label}] ` : ''}${s.groupOptions[0].name} "${s.definition}" -> ${s.result}`
          }))
      ],
      errorTestCases: [
        ...prev.errorTestCases,
        ...(curr.testCases.errorTestCases ?? [])
          .map(s => ({
            ...s,
            groupOptions: [{ name: curr.name }, ...(s.groupOptions ?? [])]
          }))
          .map(s => ({
            ...s,
            jestTitle: `${s.label ? `[${s.label}] ` : ''}${s.groupOptions[0].name} "${s.definition}" -> [${
              s.errorType
            }] "${s.errorMessage}"`
          }))
      ]
    }),
    {
      options: { pages: [{ pageName: 'Default' }], initializeOptions: { domain: 'test' } },
      successTestCases: [],
      errorTestCases: []
    }
  )
}

const OPERATION_TEST_INTERFACES: TestCaseInterface[] = [
  ...OPERATORS.filter(o => o.testCases).map<TestCaseInterface>(o => o as TestCaseInterface),
  ...FeatureTestCases
]

const ALL_TEST_CASE = reduceTestCaseInput(OPERATION_TEST_INTERFACES)

export const buildTestCases = (name?: TestCaseName): TestCaseInput => {
  if (!name) return ALL_TEST_CASE

  const interfaces = OPERATION_TEST_INTERFACES.filter(
    o =>
      o.name === name ||
      (o.testCases.successTestCases ?? []).some(t => t.groupOptions?.map(g => g.name).includes(name)) ||
      (o.testCases.errorTestCases ?? []).some(t => t.groupOptions?.map(g => g.name).includes(name))
  )
  const input = reduceTestCaseInput(interfaces)

  return {
    ...input,
    successTestCases: input.successTestCases.filter(v => v.groupOptions.map(g => g.name).includes(name)),
    errorTestCases: input.errorTestCases.filter(v => v.groupOptions.map(g => g.name).includes(name))
  }
}
