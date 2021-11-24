import { parse, quickInsert, FunctionClause, ContextInterface } from '../..'
import { FormulaContext } from '../../context'

const namespaceId = '57622108-1337-4edd-833a-2557835bcfe0'
const variableId = '481b6dd1-e668-4477-9e47-cfe5cb1239d0'
const unknownId = 'cd4f6e1e-765e-4064-badd-b5585c7eff8e'
const fooVariableId = 'd986e871-cb85-4bd5-b675-87307f60b882'

const functionClauses: FunctionClause[] = [
  {
    name: 'PLUS',
    async: false,
    pure: true,
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
    description: '',
    group: 'custom',
    returns: 'number',
    examples: [],
    chain: false,
    reference: (ctx: ContextInterface, a: number, b: number): number => a + b
  },
  {
    name: 'FORTY_TWO',
    async: false,
    pure: true,
    effect: false,
    args: [],
    description: '',
    group: 'custom',
    returns: 'number',
    examples: [],
    chain: false,
    reference: (ctx: ContextInterface): number => 42
  }
]

const formulaContext = new FormulaContext({ functionClauses })

const meta = { namespaceId, variableId, name: 'foo', input: '=24' }

const testCases = [
  '= (1 + 1) / 2 * 0.1 == (!!true and false or true) == "123"',
  '= custom::PLUS((custom::FORTY_TWO()), 1 + 1)',
  '="FOO".core::T().core::T() & "Zzz"',
  `=$${namespaceId}@${fooVariableId} + 1`,
  `=$${unknownId}@${fooVariableId} + 2`,
  `=$${namespaceId}@${unknownId} + 3`
]

const parseInput = {
  formulaContext,
  meta
}

describe('Code fragment ok', () => {
  beforeAll(async () => {
    await quickInsert({ formulaContext, meta })
  })

  testCases.forEach(input => {
    // eslint-disable-next-line jest/valid-title
    it(input, () => {
      const { codeFragments, cst } = parse({ ...parseInput, meta: { ...meta, input } })
      // expect(success).toBe(true)
      expect(cst).toMatchSnapshot()
      expect(codeFragments).toMatchSnapshot()
    })
  })
})

describe('Code fragment error TODO', () => {
  it('zzz', () => {
    expect(true).toBe(true)
  })
})
