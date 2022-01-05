import { quickInsert } from '../../grammar/api'
import { FormulaContext } from '../../context'

const namespaceId = '57622108-1337-4edd-833a-2557835bcfe0'
const fooVariableId = 'd986e871-cb85-4bd5-b675-87307f60b882'
const barVariableId = '62d9a9ee-88a1-46c7-a929-4a0d9dc0a4d6'

const variableId = '481b6dd1-e668-4477-9e47-cfe5cb1239d0'

const meta = { namespaceId, variableId, name: 'example' }
const formulaContext = new FormulaContext({})

describe('Runtime', () => {
  const ctx = { formulaContext, meta, interpretContext: { ctx: {}, arguments: [] } }

  beforeAll(async () => {
    await quickInsert({ ctx: { ...ctx, meta: { ...meta, name: 'foo', variableId: fooVariableId, input: '=24' } } })
    await quickInsert({
      ctx: {
        ...ctx,
        meta: { ...meta, name: 'bar', variableId: barVariableId, input: `=#${namespaceId}@${fooVariableId} + 1` }
      }
    })
  })

  it('ok', () => {
    const bar = formulaContext.findVariable(namespaceId, barVariableId)!
    expect(bar.t.variableValue.result.result).toEqual(25)
  })

  it('modify foo => number', async () => {
    const foo = formulaContext.findVariable(namespaceId, fooVariableId)!

    await foo.updateDefinition('=30')
    expect(foo.t.variableValue.result.result).toEqual(30)

    const bar = formulaContext.findVariable(namespaceId, barVariableId)!
    expect(bar.t.variableValue.result.result).toEqual(31)
  })

  it('modify foo => boolean', async () => {
    const foo = formulaContext.findVariable(namespaceId, fooVariableId)!

    await foo.updateDefinition('=true')
    expect(foo.t.variableValue.result.result).toEqual(true)

    const bar = formulaContext.findVariable(namespaceId, barVariableId)!
    expect(bar.t.variableValue.result.result).toEqual('Expected number but got boolean')
  })
})
