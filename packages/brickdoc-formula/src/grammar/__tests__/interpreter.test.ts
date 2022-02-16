import { parse, interpret } from '../core'
import { FormulaContext } from '../../context'
import { BaseFunctionClause, NumberResult, VariableMetadata } from '../../types'
import { quickInsert } from '../testHelper'

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

const variableId = '481b6dd1-e668-4477-9e47-cfe5cb1239d0'

const meta: VariableMetadata = { namespaceId, variableId, name: 'example', input: '=!!!', position: 0, type: 'normal' }

describe('Custom Function', () => {
  const formulaContext = new FormulaContext({ functionClauses })
  const ctx = { formulaContext, meta, interpretContext: { ctx: {}, arguments: [] } }

  beforeAll(async () => {
    await quickInsert({ ctx: { ...ctx, meta: { ...meta, name: 'foo', variableId: fooVariableId, input: '=24' } } })
  })

  const localFormulaContext = new FormulaContext({ functionClauses })

  it('Simple cst', () => {
    const newMeta = { ...meta, input: '=1+1' }
    const finalCtx = { ...ctx, meta: newMeta, formulaContext: localFormulaContext }
    const { success, cst } = parse({ ctx: finalCtx })
    expect(success).toEqual(true)
    expect(cst).toMatchSnapshot()
  })

  it('Plus', async () => {
    const input = '=custom::PLUS(1, 1)'
    const newMeta = { ...meta, input }
    const finalCtx = { ...ctx, meta: newMeta, formulaContext: localFormulaContext }
    const { success, cst, kind, errorMessages } = parse({ ctx: finalCtx })
    expect(success).toEqual(true)
    const result = await interpret({
      parseResult: { cst, kind, errorMessages },
      ctx: finalCtx
    })
    expect(result.variableValue.result.result).toEqual(2)
    expect(cst).toMatchSnapshot()
  })

  it('invoke', async () => {
    const result = await ctx.formulaContext.invoke(
      'custom::PLUS',
      { ...ctx, meta: { ...ctx.meta, input: '' } },
      { type: 'number', result: 1 },
      { type: 'number', result: 1 }
    )
    expect(result).toEqual({ type: 'number', result: 2 })
  })

  it('Function dependencies', () => {
    const newMeta = { ...meta, input: '=custom::PLUS(1, 1)' }
    const finalCtx = { ...ctx, meta: newMeta, formulaContext: localFormulaContext }
    const { success, functionDependencies } = parse({ ctx: finalCtx })
    expect(success).toEqual(true)
    expect(functionDependencies).toMatchSnapshot()
  })

  it('NOW track', () => {
    const input = '=NOW()'
    const newMeta = { ...meta, input }
    const finalCtx = { ...ctx, meta: newMeta, formulaContext: localFormulaContext }
    const { success, cst, variableDependencies, variableNameDependencies } = parse({ ctx: finalCtx })
    expect(success).toEqual(true)
    expect(variableDependencies).toEqual([])
    expect(variableNameDependencies).toEqual([])
    expect(cst).toMatchSnapshot()
  })

  it('42 error', () => {
    const input = '=custom::FORTY_TWO(1, 1, 1)'
    const newMeta = { ...meta, input }
    const finalCtx = { ...ctx, meta: newMeta, formulaContext: localFormulaContext }
    const { success, errorMessages } = parse({ ctx: finalCtx })
    expect(success).toEqual(false)
    expect(errorMessages[0]!.message).toEqual('Argument count mismatch')
  })

  it('42', async () => {
    const input = '=custom::FORTY_TWO()'
    const newMeta = { ...meta, input }
    const finalCtx = { ...ctx, meta: newMeta, formulaContext: localFormulaContext }
    const { success, cst, kind, errorMessages } = parse({ ctx: finalCtx })
    expect(success).toEqual(true)
    expect(
      (await interpret({ parseResult: { cst, kind, errorMessages }, ctx: finalCtx })).variableValue.result.result
    ).toEqual(42)
  })
})

describe('Context', () => {
  const formulaContext = new FormulaContext({ functionClauses })
  const ctx = { formulaContext, meta, interpretContext: { ctx: {}, arguments: [] } }

  beforeAll(async () => {
    await quickInsert({ ctx: { ...ctx, meta: { ...meta, name: 'foo', variableId: fooVariableId, input: '=24' } } })
  })

  it('constant variable', async () => {
    const input = `=#${namespaceId}.foo`
    const newMeta = { ...meta, input }
    const finalCtx = { ...ctx, meta: newMeta }
    const { cst, kind, errorMessages } = parse({ ctx: finalCtx })
    expect(errorMessages).toEqual([])
    expect(
      (
        await interpret({
          parseResult: { cst, kind, errorMessages },
          ctx: { meta: newMeta, formulaContext, interpretContext: { ctx: {}, arguments: [] } }
        })
      ).variableValue.result.result
    ).toEqual(24)
  })

  it('constant variable 2', async () => {
    const input = `=#${namespaceId}."foo"`
    const newMeta = { ...meta, input }
    const finalCtx = { ...ctx, meta: newMeta }
    const { cst, kind, errorMessages } = parse({ ctx: finalCtx })
    expect(errorMessages).toEqual([])
    expect(
      (
        await interpret({
          parseResult: { cst, kind, errorMessages },
          ctx: { meta: newMeta, formulaContext, interpretContext: { ctx: {}, arguments: [] } }
        })
      ).variableValue.result.result
    ).toEqual(24)
  })

  it('expression variable', async () => {
    const anotherBlockId = '9dda8306-dbe1-49d3-868d-1a7c86f27328'
    const anotherVariableId = '45e4260c-5bf1-4120-957e-1214c5ea7c20'
    const barInput = `=10 + #${namespaceId}.foo`

    // Insert bar
    const meta = { namespaceId: anotherBlockId, variableId: anotherVariableId, name: 'bar' }
    await quickInsert({ ctx: { ...ctx, meta: { ...meta, input: barInput, position: 0, type: 'normal' } } })

    const bar = formulaContext.findVariable(anotherBlockId, anotherVariableId)!

    expect(bar.t.functionDependencies).toEqual([])
    expect(bar.t.variableDependencies).toEqual([{ namespaceId, variableId: fooVariableId }])
    expect(bar.t.variableNameDependencies).toEqual([{ namespaceId, name: 'foo' }])
    expect(bar.t.flattenVariableDependencies).toEqual([{ namespaceId, variableId: fooVariableId }])

    const input = `=#${anotherBlockId}.${anotherVariableId}`
    const newMeta: VariableMetadata = {
      namespaceId,
      variableId: fooVariableId,
      name: 'bar',
      input,
      position: 0,
      type: 'normal'
    }
    const finalCtx = { ...ctx, meta: newMeta }
    const { errorMessages, flattenVariableDependencies } = parse({ ctx: finalCtx })
    expect(flattenVariableDependencies).toEqual([
      { namespaceId, variableId: fooVariableId },
      { namespaceId: anotherBlockId, variableId: anotherVariableId }
    ])
    expect(errorMessages).toEqual([{ message: 'Circular dependency found', type: 'circular_dependency' }])
  })

  it('PLUS', async () => {
    const input = `= custom::PLUS(10, #${namespaceId}.${fooVariableId})`
    const newMeta = { ...meta, input }
    const finalCtx = { ...ctx, meta: newMeta }
    const { cst, kind, errorMessages } = parse({ ctx: finalCtx })
    expect(errorMessages).toEqual([])
    expect(
      (await interpret({ parseResult: { cst, kind, errorMessages }, ctx: finalCtx })).variableValue.result.result
    ).toEqual(34)
  })

  it('Type', () => {
    const input = `= "barbarbar" & #${namespaceId}."foo"`
    const newMeta = { ...meta, input }
    const finalCtx = { ...ctx, meta: newMeta }
    const { errorMessages, codeFragments } = parse({ ctx: finalCtx })
    expect(codeFragments).toMatchSnapshot()
    expect(errorMessages).toEqual([{ message: 'Expected string but got number', type: 'type' }])
  })

  it('unknown namespace', () => {
    const input = `=Unknown.foo`
    const newMeta = { ...meta, input }
    const finalCtx = { ...ctx, meta: newMeta }
    const { errorMessages } = parse({ ctx: finalCtx })
    expect(errorMessages).toEqual([
      { message: 'Unknown function Unknown', type: 'syntax' },
      { message: 'TODO mismatch token FunctionCall', type: 'parse' }
    ])
  })

  it('unknown variable 1', () => {
    const input = `=Untitled.unknown`
    const newMeta = { ...meta, input }
    const finalCtx = { ...ctx, meta: newMeta }
    const { errorMessages } = parse({ ctx: finalCtx })
    expect(errorMessages).toEqual([{ message: 'Variable "unknown" not found', type: 'deps' }])
  })

  it('unknown variable 2', () => {
    const input = `=Untitled."unknown variable"`
    const newMeta = { ...meta, input }
    const finalCtx = { ...ctx, meta: newMeta }
    const { errorMessages } = parse({ ctx: finalCtx })
    expect(errorMessages).toEqual([{ message: 'Variable "unknown variable" not found', type: 'deps' }])
  })
})
