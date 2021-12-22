import { parse, interpret, quickInsert, BaseFunctionClause, NumberResult } from '../..'
import { FormulaContext } from '../../context'

const functionClauses: Array<BaseFunctionClause<any>> = [
  {
    name: 'PLUS',
    async: false,
    pure: true,
    acceptError: false,
    effect: false,
    lazy: false,
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
    pure: true,
    acceptError: false,
    effect: false,
    lazy: false,
    args: [],
    examples: [{ input: '=1', output: { type: 'any', result: 1 } }],
    description: '',
    group: 'custom',
    returns: 'number',
    testCases: [],
    chain: false,
    reference: ctx => ({ type: 'number', result: 42 })
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
    const result = await interpret({ cst, meta: newMeta, formulaContext: localFormulaContext, interpretContext: {} })
    expect(result.variableValue.result.result).toEqual(2)
    expect(cst).toMatchSnapshot()
  })

  it('Function dependencies', () => {
    const newMeta = { ...meta, input: '=custom::PLUS(1, 1)' }
    const { success, functionDependencies } = parse({
      ...parseInput,
      meta: newMeta,
      formulaContext: localFormulaContext
    })
    expect(success).toEqual(true)
    expect(functionDependencies).toMatchSnapshot()
  })

  it('NOW track', () => {
    const input = '=NOW()'
    const newMeta = { ...meta, input }
    const { success, cst, variableDependencies } = parse({
      ...parseInput,
      meta: newMeta,
      formulaContext: localFormulaContext
    })
    expect(success).toEqual(true)
    expect(variableDependencies).toEqual([])
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
    expect(
      (await interpret({ cst, meta: newMeta, formulaContext: localFormulaContext, interpretContext: {} })).variableValue
        .result.result
    ).toEqual(42)
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
    expect(
      (await interpret({ cst, meta: newMeta, formulaContext, interpretContext: {} })).variableValue.result.result
    ).toEqual(24)
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
    expect(
      (await interpret({ cst, formulaContext, meta: newMeta, interpretContext: {} })).variableValue.result.result
    ).toEqual(34)
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
