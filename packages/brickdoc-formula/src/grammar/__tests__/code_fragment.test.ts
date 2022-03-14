import { parse } from '../core'
import { FormulaContext } from '../../context'
import { BaseFunctionClause, NumberResult, VariableMetadata } from '../../types'
import { quickInsert } from '../testHelper'

const namespaceId = '57622108-1337-4edd-833a-2557835bcfe0'
const variableId = '481b6dd1-e668-4477-9e47-cfe5cb1239d0'
const unknownId = 'cd4f6e1e-765e-4064-badd-b5585c7eff8e'

const functionClauses: Array<BaseFunctionClause<any>> = [
  {
    name: 'PLUS',
    async: false,
    pure: true,
    lazy: false,
    acceptError: false,
    effect: false,
    args: [
      {
        type: 'number',
        name: 'a'
      },
      {
        type: 'number',
        name: 'b'
      }
    ],
    examples: [{ input: '=1', output: { type: 'any', result: 1 } }],
    description: '',
    group: 'custom',
    returns: 'number',
    testCases: [],
    chain: false,
    reference: (ctx, a: NumberResult, b: NumberResult) => ({ type: 'number', result: a.result + b.result })
  },
  {
    name: 'FORTY_TWO',
    async: false,
    lazy: false,
    acceptError: false,
    pure: true,
    effect: false,
    args: [],
    examples: [{ input: '=1', output: { type: 'any', result: 1 } }],
    description: '',
    group: 'custom',
    returns: 'number',
    testCases: [],
    chain: false,
    reference: () => ({ type: 'number', result: 42 })
  }
]

const formulaContext = new FormulaContext({ domain: 'test', functionClauses })

const meta: VariableMetadata = { namespaceId, variableId, name: 'foo', input: '=24', position: 0, type: 'normal' }

const testCases = [
  '= (1 + 1) / 2 * 0.1 == (!!true and false or true) == "123"',
  '= custom::PLUS((custom::FORTY_TWO()), 1 + 1)',
  '= ABS("123")',
  '="FOO".T().T() & "Zzz"',
  `=#${namespaceId}.foo + 1`,
  `=#${unknownId}.foo + 2`,
  `=#${namespaceId}."bar" + 3`,
  `=foo + 1`,
  `=#${namespaceId}.foo + 1`,
  `=Untitled.foo + 1`,
  `=Bar.foo + 2`,
  `=Untitled.bar + 3`
]

const ctx = {
  formulaContext,
  meta,
  interpretContext: { ctx: {}, arguments: [] }
}

describe('Code fragment ok', () => {
  beforeAll(async () => {
    await quickInsert({ ctx })
  })

  testCases.forEach(input => {
    // eslint-disable-next-line jest/valid-title
    it(input, () => {
      const { codeFragments, cst } = parse({ ctx: { ...ctx, meta: { ...meta, input } } })
      // expect(success).toBe(true)
      expect(cst).toMatchSnapshot()
      expect(codeFragments).toMatchSnapshot()
    })
  })
})
