import { parse, interpret, quickInsert, FunctionClause, BUILTIN_CLAUSES, ContextInterface } from '../..'
import { FormulaContext } from '../../context'

const functionClauses: Array<FunctionClause<any>> = [
  {
    name: 'PLUS',
    async: false,
    pure: true,
    effect: false,
    key: 'custom::PLUS',
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
    reference: (ctx: ContextInterface, a: number, b: number) => ({ type: 'number', result: a + b })
  },
  {
    name: 'FORTY_TWO',
    async: false,
    pure: true,
    effect: false,
    key: 'custom::FORTY_TWO',
    args: [],
    description: '',
    group: 'custom',
    returns: 'number',
    examples: [],
    chain: false,
    reference: (ctx: ContextInterface) => ({ type: 'number', result: 42 })
  }
]

const namespaceId = '57622108-1337-4edd-833a-2557835bcfe0'
const fooVariableId = 'd986e871-cb85-4bd5-b675-87307f60b882'
const unknownId = 'cd4f6e1e-765e-4064-badd-b5585c7eff8e'

const variableId = '481b6dd1-e668-4477-9e47-cfe5cb1239d0'

const meta = { namespaceId, variableId, name: 'example' }

describe('Custom Function', () => {
  const formulaContext = new FormulaContext({ functionClauses })
  const parseInput = { formulaContext, meta }

  beforeAll(async () => {
    await quickInsert({ formulaContext, meta: { ...meta, name: 'foo', variableId: fooVariableId, input: '=24' } })
  })

  const localFormulaContext = new FormulaContext({ functionClauses })

  it('Simple cst', () => {
    const newMeta = { ...meta, input: '=1+1' }
    const { success, cst } = parse({ ...parseInput, meta: newMeta, formulaContext: localFormulaContext })
    expect(success).toEqual(true)
    expect(cst).toMatchSnapshot()
  })

  it('Plus', async () => {
    const input = '=custom::PLUS(1, 1)'
    const newMeta = { ...meta, input }
    const { success, cst } = parse({ ...parseInput, meta: newMeta, formulaContext: localFormulaContext })
    expect(success).toEqual(true)
    expect((await interpret({ cst, meta: newMeta, formulaContext: localFormulaContext })).result.value).toEqual(2)
    expect(cst).toMatchSnapshot()
  })

  it('Today track', () => {
    const input = '=TODAY()'
    const newMeta = { ...meta, input }
    const { success, cst, variableDependencies, functionDependencies } = parse({
      ...parseInput,
      meta: newMeta,
      formulaContext: localFormulaContext
    })
    expect(success).toEqual(true)
    expect(variableDependencies).toEqual([])
    expect(functionDependencies).toEqual([BUILTIN_CLAUSES.find(c => c.name === 'TODAY')!])
    expect(cst).toMatchSnapshot()
  })

  it('42 error', () => {
    const input = '=custom::FORTY_TWO(1, 1, 1)'
    const newMeta = { ...meta, input }

    const { success, errorMessages } = parse({ ...parseInput, meta: newMeta, formulaContext: localFormulaContext })
    expect(success).toEqual(false)
    expect(errorMessages[0]!.message).toEqual('Argument count mismatch')
  })

  it('42', async () => {
    const input = '=custom::FORTY_TWO()'
    const newMeta = { ...meta, input }
    const { success, cst } = parse({ ...parseInput, meta: newMeta, formulaContext: localFormulaContext })
    expect(success).toEqual(true)
    expect((await interpret({ cst, meta: newMeta, formulaContext: localFormulaContext })).result.value).toEqual(42)
  })
})

describe('Context', () => {
  const formulaContext = new FormulaContext({ functionClauses })
  const parseInput = { formulaContext, meta }

  beforeAll(async () => {
    await quickInsert({ formulaContext, meta: { ...meta, name: 'foo', variableId: fooVariableId, input: '=24' } })
  })

  it('constant variable', async () => {
    const input = `=$${namespaceId}@${fooVariableId}`
    const newMeta = { ...meta, input }
    const { cst, errorMessages } = parse({ ...parseInput, meta: newMeta })
    expect(errorMessages).toEqual([])
    expect((await interpret({ cst, meta: newMeta, formulaContext })).result.value).toEqual(24)
  })

  it('expression variable', async () => {
    const anotherBlockId = '9dda8306-dbe1-49d3-868d-1a7c86f27328'
    const anotherVariableId = '45e4260c-5bf1-4120-957e-1214c5ea7c20'
    const barInput = `=10 + $${namespaceId}@${fooVariableId}`

    // Insert bar
    const meta = { namespaceId: anotherBlockId, variableId: anotherVariableId, name: 'bar' }
    await quickInsert({ formulaContext, meta: { ...meta, input: barInput } })

    const bar = formulaContext.findVariable(anotherBlockId, anotherVariableId)!

    expect(bar.t.functionDependencies).toEqual([])
    expect(bar.t.variableDependencies).toEqual([{ namespaceId, variableId: fooVariableId }])
    expect(bar.t.flattenVariableDependencies).toEqual(new Set([{ namespaceId, variableId: fooVariableId }]))

    const input = `=$${anotherBlockId}@${anotherVariableId}`
    const newMeta = { namespaceId, variableId: fooVariableId, name: 'bar', input }
    const { errorMessages, flattenVariableDependencies } = parse({ ...parseInput, meta: newMeta })
    expect(flattenVariableDependencies).toEqual(
      new Set([
        { namespaceId, variableId: fooVariableId },
        { namespaceId: anotherBlockId, variableId: anotherVariableId }
      ])
    )
    expect(errorMessages).toEqual([{ message: 'Circular dependency found', type: 'circular_dependency' }])
  })

  it('PLUS', async () => {
    const input = `= custom::PLUS(10, $${namespaceId}@${fooVariableId})`
    const newMeta = { ...meta, input }
    const { cst, errorMessages } = parse({ ...parseInput, meta: newMeta })
    expect(errorMessages).toEqual([])
    expect((await interpret({ cst, formulaContext, meta: newMeta })).result.value).toEqual(34)
  })

  it('syntax', () => {
    const input = `= "foo" &&& 123`
    const newMeta = { ...meta, input }
    const { errorMessages } = parse({ ...parseInput, meta: newMeta })
    expect(errorMessages).toEqual([
      {
        message: `Expecting: one of these possible Token sequences:
  1. [LParen]
  2. [Minus]
  3. [NumberLiteral]
  4. [BooleanLiteral]
  5. [StringLiteral]
  6. [Dollar, UUID, At]
  7. [Dollar, UUID, Sharp]
  8. [Dollar, UUID]
  9. [FunctionGroupName]
  10. [FunctionName]
but found: '&'`,
        type: 'syntax'
      }
    ])
  })

  it('Type', () => {
    const input = `= "foo" & $${namespaceId}@${fooVariableId}`
    const newMeta = { ...meta, input }
    const { errorMessages } = parse({ ...parseInput, meta: newMeta })
    expect(errorMessages).toEqual([{ message: 'Expected string but got number', type: 'type' }])
  })

  it('unknown namespace', () => {
    const input = `=$${unknownId}@${fooVariableId}`
    const newMeta = { ...meta, input }
    const { errorMessages } = parse({ ...parseInput, meta: newMeta })
    expect(errorMessages).toEqual([{ message: `Variable not found: ${fooVariableId}`, type: 'deps' }])
  })

  it('unknown variable', () => {
    const input = `=$${namespaceId}@${unknownId}`
    const newMeta = { ...meta, input }
    const { errorMessages } = parse({ ...parseInput, meta: newMeta })
    expect(errorMessages).toEqual([{ message: `Variable not found: ${unknownId}`, type: 'deps' }])
  })
})
