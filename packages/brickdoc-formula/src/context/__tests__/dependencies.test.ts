/* eslint-disable max-nested-callbacks */
import {
  buildVariable,
  FunctionClause,
  interpret,
  parse,
  quickInsert,
  SuccessInterpretResult,
  SuccessParseResult,
  VariableMetadata
} from '../..'
import { FormulaContext } from '..'

const functionClauses: Array<FunctionClause<any>> = []
const formulaContext = new FormulaContext({ functionClauses })

const namespaceId = '9dda8306-dbe1-49d3-868d-1a7c86f27328'
const variableIds = [
  'cd0755b8-0000-4326-876d-853e59cb0259',
  '88d64c7c-1111-4eea-be97-133e12c8c1ce',
  '94a89a9d-2222-4e46-ae48-887238bc2bec',
  'f78cb1af-3333-4d8b-8cd4-4e8a7da3a373',
  '74d1a0a2-4444-407b-a470-ac6ae1f3e8e2',
  'a17872fd-5555-4fe1-9cc9-57169a46b645',
  '396b8653-6666-4126-92b6-74006a435276'
]

const variableWithNames = variableIds.map((id, index) => ({ variableId: id, name: `num${index}` }))

const asyncForEach = async (
  array: string | any[],
  callback: { (meta: VariableMetadata): Promise<void>; (arg0: any, arg1: number, arg2: any): any }
): Promise<void> => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}

describe('Dependency', () => {
  beforeAll(async () => {
    formulaContext.reset()

    const metas: VariableMetadata[] = [
      { name: 'num0', input: '=1' },
      { name: 'num1', input: '=2' },
      { name: 'num2', input: '=$num0' },
      { name: 'num3', input: '=$num2 + $num1' },
      { name: 'num4', input: '=$num2 + $num0' },
      { name: 'num5', input: '=$num3 + $num0 + $num2' },
      { name: 'num6', input: '=$num4 + $num1' }
    ].map(({ name, input }) => ({
      name,
      namespaceId,
      variableId: variableWithNames.find(v => v.name === name)!.variableId,
      input: input.replace(/\$([a-zA-Z0-9_-]+)/g, (a, variableName): string => {
        return `$${namespaceId}@${variableWithNames.find(v => v.name === variableName)!.variableId}`
      })
    }))

    await asyncForEach(metas, async (meta: VariableMetadata) => {
      await quickInsert({ formulaContext, meta })
    })
  })

  it('snapshot', () => {
    expect(formulaContext.reverseVariableDependencies).toMatchSnapshot()
    expect(formulaContext.findVariable(namespaceId, variableIds[5])!.t.variableValue.value).toEqual(5)
    expect(formulaContext.findVariable(namespaceId, variableIds[6])!.t.variableValue.value).toEqual(4)
    expect(
      Object.values(formulaContext.context).map(v => ({ ...v.t, cst: null, variableValue: { ...v.t.variableValue, updatedAt: null } }))
    ).toMatchSnapshot()
  })

  it('circular dependency check', () => {
    const input = `=$${namespaceId}@${variableIds[6]}`
    const meta = { namespaceId, variableId: variableIds[0], name: 'num0', input }
    const { errorMessages } = parse({ formulaContext, meta })
    expect(errorMessages).toEqual([{ message: 'Circular dependency found', type: 'circular_dependency' }])
  })

  it('dependency automatic update', async () => {
    const input = `=$${namespaceId}@${variableIds[0]} * 2 + 100`
    const meta = { namespaceId, variableId: variableIds[1], name: 'num1', input }
    const parseResult = parse({ formulaContext, meta }) as SuccessParseResult
    expect(parseResult.errorMessages).toEqual([])
    const view = {}
    const interpretResult = (await interpret({ cst: parseResult.cst, formulaContext, meta })) as SuccessInterpretResult
    expect(interpretResult.errorMessages).toEqual([])

    const variable = buildVariable({ formulaContext, meta, parseResult, interpretResult, view })
    await formulaContext.commitVariable({ variable })

    // TODO automatic update dependency
    // expect(formulaContext.findVariable(namespaceId, variableIds[5]).t.variableValue.value).toEqual(105)
    // expect(formulaContext.findVariable(namespaceId, variableIds[6]).t.variableValue.value).toEqual(104)
    expect(formulaContext.reverseVariableDependencies).toMatchSnapshot()
    expect(
      Object.values(formulaContext.context).map(v => ({ ...v.t, cst: null, variableValue: { ...v.t.variableValue, updatedAt: null } }))
    ).toMatchSnapshot()
  })
})
