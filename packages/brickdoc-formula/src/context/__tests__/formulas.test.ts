import { appendFormulas } from '../../grammar/core'
import { Formula } from '../../types'
import { FormulaContext } from '../context'

describe('appendFormulas', () => {
  it('constant', async () => {
    const formulaContext = new FormulaContext({ domain: 'test' })
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

  it('expression', async () => {
    const formulaContext = new FormulaContext({ domain: 'test' })
    await appendFormulas(formulaContext, [])

    expect(formulaContext.variables).toEqual({})

    const fooVariableId = '1588aedf-06e1-47f1-9282-d2ffe865974c'
    const fooNamespaceId = 'd986e871-cb85-4bd5-b675-87307f60b882'

    const barVariableId = '475d9e73-e52a-42b3-8a95-477596812900'
    const barNamespaceId = '615d7f74-dc97-4aae-8690-b6cba1072a6a'

    const formulas: Formula[] = [
      {
        name: 'foo',
        id: fooVariableId,
        blockId: fooNamespaceId,
        definition: '= 123 + 0.123',
        version: 0,
        type: 'normal',
        cacheValue: {
          type: 'number',
          result: 123.123
        }
      },
      {
        name: 'bar',
        id: barVariableId,
        blockId: barNamespaceId,
        version: 0,
        definition: `=ABS(123) + #${fooNamespaceId}.foo`,
        type: 'normal',
        cacheValue: {
          type: 'number',
          result: 456
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
    expect(formulaContext.reverseFunctionDependencies).toMatchSnapshot()
    expect(formulaContext.reverseVariableDependencies).toMatchSnapshot()
  })

  it('unmatched variable', async () => {
    const formulaContext = new FormulaContext({ domain: 'test' })
    await appendFormulas(formulaContext, [])

    expect(formulaContext.variables).toEqual({})
    // const fooVariableId = '1588aedf-06e1-47f1-9282-d2ffe865974c'
    const fooNamespaceId = 'd986e871-cb85-4bd5-b675-87307f60b882'

    const barVariableId = '475d9e73-e52a-42b3-8a95-477596812900'
    const barNamespaceId = '615d7f74-dc97-4aae-8690-b6cba1072a6a'

    const formulas: Formula[] = [
      {
        name: 'bar',
        id: barVariableId,
        blockId: barNamespaceId,
        version: 0,
        type: 'normal',
        definition: `=ABS(123) + #${fooNamespaceId}.foo`,
        cacheValue: {
          type: 'number',
          result: 456
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
    const formulaContext = new FormulaContext({ domain: 'test' })
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
