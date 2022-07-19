import { appendFormulas } from '../grammar/core'
import { Formula } from '../type'
import { FormulaContext } from '../context/context'

describe('appendFormulas TODO', () => {
  it('constant', async () => {
    const formulaContext = new FormulaContext({ username: 'test' })
    await appendFormulas(formulaContext, [])

    expect(formulaContext.variables).toEqual({})

    const fooVariableId = '1588aedf-06e1-47f1-9282-d2ffe865974c'
    const fooNamespaceId = 'd986e871-cb85-4bd5-b675-87307f60b882'

    const formulas: Formula[] = [
      {
        name: 'foo',
        id: fooVariableId,
        blockId: fooNamespaceId,
        version: 0,
        definition: '=123',
        type: 'normal',
        meta: {},
        cacheValue: {
          type: 'number',
          result: 123
        }
      }
    ]

    await appendFormulas(formulaContext, formulas)
    const value = Object.values(formulaContext.variables).map((v: any) => {
      const t = v.t
      return {
        ...t,
        task: { ...t.task, execStartTime: null, execEndTime: null, uuid: null }
      }
    })
    expect(value).toMatchSnapshot()
  })

  it('parse error', async () => {
    const formulaContext = new FormulaContext({ username: 'test' })
    await appendFormulas(formulaContext, [])

    expect(formulaContext.variables).toEqual({})

    const fooId = '615d7f74-dc97-4aae-8690-b6cba1072a6a'
    const fooNamespaceId = 'd986e871-cb85-4bd5-b675-87307f60b882'

    const formulas: Formula[] = [
      {
        name: 'foo',
        id: fooId,
        blockId: fooNamespaceId,
        version: 0,
        type: 'normal',
        meta: {},
        definition: '= 123 +',
        cacheValue: {
          type: 'number',
          result: 123
        }
      }
    ]

    await appendFormulas(formulaContext, formulas)
    const value = Object.values(formulaContext.variables).map((v: any) => {
      const t = v.t
      return {
        ...t,
        task: { ...t.task, execStartTime: null, execEndTime: null, uuid: null }
      }
    })
    expect(value).toMatchSnapshot()
  })
})
