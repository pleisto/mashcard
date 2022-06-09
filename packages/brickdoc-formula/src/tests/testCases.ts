import { OPERATORS } from '../grammar'
import { FeatureTestCases } from './feature'
import { BaseTestCase, SpreadsheetInput, TestCaseInput, TestCaseInterface, TestCaseName } from './testType'

export const NAME_SPECIAL_INVALID_CHARS = [...'()[]{}!@#$%^&*-+=|\\:;\'"<>,./?`~', ' ', '\t', '\n', '\r', '\u2003']
export const NAME_VALID_SUFFIX_ONLY = ['中文', 'é', '😉', '1', '감사']
export const BUILTIN_STRINGS = ['in', 'EXACTIN', 'true', 'False', 'and', 'not', 'Null', 'Or']
export const NAME_VALID_PREFIX = ['a', '_', ...BUILTIN_STRINGS]

const buildRequiredFields = (
  curr: TestCaseInterface,
  type: BaseTestCase<{}>,
  prefix: any,
  suffix: any
): Required<Pick<BaseTestCase<{}>, 'groupOptions' | 'jestTitle'>> => {
  return {
    groupOptions: [{ name: curr.name as any, options: type.currentGroupOption }, ...(type.groupOptions ?? [])],
    jestTitle: `${type.label ? `[${type.label}] ` : ''}${curr.name} "${prefix}"${suffix !== '' ? ` -> ${suffix}` : ''}`
  }
}

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
      dependencyTestCases: [
        ...prev.dependencyTestCases,
        ...(curr.testCases.dependencyTestCases ?? []).map(s => ({
          ...s,
          ...buildRequiredFields(
            curr,
            s,
            `${s.name} ${s.testCases.map(s => `${JSON.stringify(s.action)}`).join(',')}`,
            ''
          )
        }))
      ],
      successTestCases: [
        ...prev.successTestCases,
        ...(curr.testCases.successTestCases ?? []).map(s => ({
          ...s,
          ...buildRequiredFields(
            curr,
            s,
            s.position !== undefined ? `<${s.position}> ${s.definition}` : s.definition,
            s.result
          )
        }))
      ],
      errorTestCases: [
        ...prev.errorTestCases,
        ...(curr.testCases.errorTestCases ?? []).map(s => ({
          ...s,
          ...buildRequiredFields(
            curr,
            s,
            s.position !== undefined ? `<${s.position}> ${s.definition}` : s.definition,
            `[${s.errorType}] "${s.errorMessage}"`
          )
        }))
      ]
    }),
    {
      options: { pages: [{ pageName: 'Default' }], initializeOptions: { domain: 'test' } },
      successTestCases: [],
      errorTestCases: [],
      dependencyTestCases: []
    }
  )
}

const OPERATION_TEST_INTERFACES: TestCaseInterface[] = [
  ...OPERATORS.filter(o => o.testCases).map<TestCaseInterface>(o => o as TestCaseInterface),
  ...FeatureTestCases
]

const ALL_TEST_CASE = reduceTestCaseInput(OPERATION_TEST_INTERFACES)

const allUUIDs = ALL_TEST_CASE.options.pages
  .flatMap(p => [
    p.pageId,
    ...(p.spreadsheets ?? [])?.flatMap((s: SpreadsheetInput<1, 1>) => [
      s.spreadsheetId,
      // eslint-disable-next-line max-nested-callbacks
      ...s.columns.flatMap(c => [c.columnId, ...c.cells.map(cell => cell.cellId)]),
      ...(s.rows ?? []).map(r => r.rowId)
    ]),
    ...(p.variables ?? [])?.map(v => v.variableId)
  ])
  .filter(u => u)

if (allUUIDs.length !== new Set(allUUIDs).size) {
  throw new Error('Duplicate UUIDs')
}

export const buildTestCases = (name?: TestCaseName): [TestCaseInput] => {
  if (!name) return [ALL_TEST_CASE]

  const interfaces = OPERATION_TEST_INTERFACES.filter(
    o =>
      o.name === name ||
      (o.testCases.successTestCases ?? []).some(t => t.groupOptions?.map(g => g.name).includes(name)) ||
      (o.testCases.errorTestCases ?? []).some(t => t.groupOptions?.map(g => g.name).includes(name))
  )
  const input = reduceTestCaseInput(interfaces)

  return [
    {
      ...input,
      successTestCases: input.successTestCases.filter(v => v.groupOptions.map(g => g.name).includes(name)),
      errorTestCases: input.errorTestCases.filter(v => v.groupOptions.map(g => g.name).includes(name))
    }
  ]
}
