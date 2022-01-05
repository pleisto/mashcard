import { appendFormulas } from '../../grammar/api'
import { Formula } from '../../types'
import { FormulaContext } from '../context'

describe('appendFormulas', () => {
  it('constant', () => {
    const formulaContext = new FormulaContext({})
    void appendFormulas(formulaContext, [])

    expect(formulaContext.context).toEqual({})

    const fooVariableId = '1588aedf-06e1-47f1-9282-d2ffe865974c'
    const fooNamespaceId = 'd986e871-cb85-4bd5-b675-87307f60b882'

    const formulas: Formula[] = [
      {
        name: 'foo',
        id: fooVariableId,
        blockId: fooNamespaceId,
        version: 0,
        level: 0,
        definition: '=123',
        kind: 'constant',
        updatedAt: new Date().toDateString(),
        createdAt: 0,
        cacheValue: {
          type: 'number',
          result: 123
        },
        view: {}
      }
    ]

    void appendFormulas(formulaContext, formulas)
    const value = Object.values(formulaContext.context).map((v: any) => {
      const t = v.t
      return {
        ...t,
        variableValue: { ...t.variableValue, updatedAt: null }
      }
    })
    expect(value).toMatchSnapshot()
  })

  it('expression', () => {
    const formulaContext = new FormulaContext({})
    void appendFormulas(formulaContext, [])

    expect(formulaContext.context).toEqual({})

    const fooVariableId = '1588aedf-06e1-47f1-9282-d2ffe865974c'
    const fooNamespaceId = 'd986e871-cb85-4bd5-b675-87307f60b882'

    const barVariableId = '475d9e73-e52a-42b3-8a95-477596812900'
    const barNamespaceId = '615d7f74-dc97-4aae-8690-b6cba1072a6a'

    const formulas: Formula[] = [
      {
        name: 'foo',
        id: fooVariableId,
        blockId: fooNamespaceId,
        definition: '= 123 + RAND()',
        kind: 'constant',
        updatedAt: new Date().toDateString(),
        createdAt: 0,
        version: 0,
        level: 0,
        cacheValue: {
          type: 'number',
          result: 123
        },
        view: {}
      },
      {
        name: 'bar',
        id: barVariableId,
        blockId: barNamespaceId,
        version: 0,
        level: 0,
        kind: 'expression',
        definition: `=ABS(123) + #${fooNamespaceId}@${fooVariableId}`,
        updatedAt: new Date().toDateString(),
        createdAt: 0,
        cacheValue: {
          type: 'number',
          result: 456
        },
        view: {}
      }
    ]

    void appendFormulas(formulaContext, formulas)
    const value = Object.values(formulaContext.context).map((v: any) => {
      const t = v.t
      return {
        ...t,
        variableValue: { ...t.variableValue, updatedAt: null }
      }
    })
    expect(value).toMatchSnapshot()
    expect(formulaContext.reverseFunctionDependencies).toMatchSnapshot()
    expect(formulaContext.reverseVariableDependencies).toMatchSnapshot()
  })

  it('unmatched variable', () => {
    const formulaContext = new FormulaContext({})
    void appendFormulas(formulaContext, [])

    expect(formulaContext.context).toEqual({})
    const fooVariableId = '1588aedf-06e1-47f1-9282-d2ffe865974c'
    const fooNamespaceId = 'd986e871-cb85-4bd5-b675-87307f60b882'

    const barVariableId = '475d9e73-e52a-42b3-8a95-477596812900'
    const barNamespaceId = '615d7f74-dc97-4aae-8690-b6cba1072a6a'

    const formulas: Formula[] = [
      {
        name: 'bar',
        id: barVariableId,
        blockId: barNamespaceId,
        version: 0,
        level: 0,
        kind: 'expression',
        definition: `=ABS(123) + #${fooNamespaceId}@${fooVariableId}`,
        updatedAt: new Date().toDateString(),
        createdAt: 0,
        cacheValue: {
          type: 'number',
          result: 456
        },
        view: {}
      }
    ]

    void appendFormulas(formulaContext, formulas)
    const value = Object.values(formulaContext.context).map((v: any) => {
      const t = v.t
      return {
        ...t,
        variableValue: { ...t.variableValue, updatedAt: null }
      }
    })
    expect(value).toMatchSnapshot()
  })

  it('parse error', () => {
    const formulaContext = new FormulaContext({})
    void appendFormulas(formulaContext, [])

    expect(formulaContext.context).toEqual({})

    const fooId = '615d7f74-dc97-4aae-8690-b6cba1072a6a'
    const fooNamespaceId = 'd986e871-cb85-4bd5-b675-87307f60b882'

    const formulas: Formula[] = [
      {
        name: 'foo',
        id: fooId,
        blockId: fooNamespaceId,
        version: 0,
        level: 0,
        definition: '= 123 +',
        kind: 'constant',
        updatedAt: new Date().toDateString(),
        createdAt: 0,
        cacheValue: {
          type: 'number',
          result: 123
        },
        view: {}
      }
    ]

    void appendFormulas(formulaContext, formulas)
    const value = Object.values(formulaContext.context).map((v: any) => {
      const t = v.t
      return {
        ...t,
        variableValue: { ...t.variableValue, updatedAt: null }
      }
    })
    expect(value).toMatchSnapshot()
  })
})
