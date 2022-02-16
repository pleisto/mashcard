/* eslint-disable max-nested-callbacks */
import { buildVariable, interpret, parse, SuccessParseResult } from '../../grammar/core'
import { quickInsert } from '../../grammar/testHelper'
import { VariableMetadata } from '../../types'
import { FormulaContext } from '../context'

const formulaContext = new FormulaContext({})

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

const interpretContext = { ctx: {}, arguments: [] }

const asyncForEach = async (
  array: string | any[],
  callback: { (meta: VariableMetadata): Promise<void>; (arg0: any, arg1: number, arg2: any): any }
): Promise<void> => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}

const metas: VariableMetadata[] = [
  { name: 'num0', input: '=1' }, // num0 = 1
  { name: 'num1', input: '=2' }, // num1 = 2
  { name: 'num2', input: '=$num0' }, // num2 = num0 = 1
  { name: 'num3', input: '=$num2 + $num1' }, // num3 = num2 + num1 = 3
  { name: 'num4', input: '=$num2 + $num0' }, // num4 = num2 + num0 = 2
  { name: 'num5', input: '=$num3 + $num0 + $num2' }, // num5 = num3 + num0 + num2 = 5
  { name: 'num6', input: '=$num4 + $num1' } // num6 = num4 + num1 = 4
].map(({ name, input }) => ({
  name,
  namespaceId,
  type: 'normal',
  position: 0,
  variableId: variableWithNames.find(v => v.name === name)!.variableId,
  input: input.replace(/\$([a-zA-Z0-9_-]+)/g, (a, variableName): string => {
    return `#${namespaceId}.${variableWithNames.find(v => v.name === variableName)!.variableId}`
  })
}))

describe('Dependency', () => {
  beforeEach(async () => {
    formulaContext.resetFormula()

    await asyncForEach(metas, async (meta: VariableMetadata) => {
      await quickInsert({ ctx: { formulaContext, meta, interpretContext } })
    })
  })

  it('snapshot', async () => {
    expect(formulaContext.reverseVariableDependencies).toMatchSnapshot()
    expect(formulaContext.findVariable(namespaceId, variableIds[5])!.t.variableValue.result).toEqual({
      result: 5,
      type: 'number'
    })
    expect(formulaContext.findVariable(namespaceId, variableIds[6])!.t.variableValue.result).toEqual({
      result: 4,
      type: 'number'
    })
    expect(
      Object.values(formulaContext.context).map(v => ({
        ...v.t,
        cst: null,
        variableValue: { ...v.t.variableValue, updatedAt: null }
      }))
    ).toMatchSnapshot()
  })

  it('circular dependency check', async () => {
    const input = `=#${namespaceId}.${variableIds[6]}`
    const meta: VariableMetadata = {
      namespaceId,
      variableId: variableIds[0],
      name: 'num0',
      input,
      position: 0,
      type: 'normal'
    }
    const { errorMessages } = parse({ ctx: { formulaContext, meta, interpretContext } })
    expect(errorMessages).toEqual([{ message: 'Circular dependency found', type: 'circular_dependency' }])
  })

  it('modify num0 => number', async () => {
    const num0 = formulaContext.findVariable(namespaceId, variableIds[0])!

    await num0.updateDefinition('=30')
    expect(num0.t.variableValue.result.result).toEqual(30)

    const num2 = formulaContext.findVariable(namespaceId, variableIds[2])!
    expect(num2.t.variableValue.result.result).toEqual(30)
  })

  it('modify num0 => invalid', async () => {
    const num0 = formulaContext.findVariable(namespaceId, variableIds[0])!

    await num0.updateDefinition('=30foobar')
    expect(num0.t.variableValue.result.result).toEqual('Not all input parsed: foobar')

    const num2 = formulaContext.findVariable(namespaceId, variableIds[2])!
    expect(num2.t.variableValue.result.result).toEqual('Not all input parsed: foobar')

    await num0.updateDefinition('=233')
    expect(num0.t.variableValue.result.result).toEqual(233)
    expect(num2.t.variableValue.result.result).toEqual(233)
  })

  it('modify num0 => boolean', async () => {
    const num0 = formulaContext.findVariable(namespaceId, variableIds[0])!

    await num0.updateDefinition('=true')
    expect(num0.t.variableValue.result.result).toEqual(true)

    const num4 = formulaContext.findVariable(namespaceId, variableIds[4])!
    expect(num4.t.variableValue.result.result).toEqual('Expected number but got boolean')

    const num2 = formulaContext.findVariable(namespaceId, variableIds[2])!
    expect(num2.t.variableValue.result.result).toEqual(true)

    const num3 = formulaContext.findVariable(namespaceId, variableIds[3])!

    // const num1 = formulaContext.findVariable(namespaceId, variableIds[1])!
    // num3 = num2 + num1 = 3
    // TODO fix this
    expect(num3.t.variableValue.result.result).toEqual(3)
  })

  it('dependency automatic update', async () => {
    // num1 = 2 -> num1 = num0 * 2 + 100 = 102
    const input = `=#${namespaceId}.${variableIds[0]} * 2 + 100`
    const meta: VariableMetadata = {
      namespaceId,
      variableId: variableIds[1],
      name: 'num1',
      input,
      position: 0,
      type: 'normal'
    }
    const parseResult = parse({ ctx: { formulaContext, meta, interpretContext } }) as SuccessParseResult
    expect(parseResult.errorMessages).toEqual([])
    const interpretResult = await interpret({
      parseResult,
      ctx: {
        formulaContext,
        meta,
        interpretContext: { ctx: {}, arguments: [] }
      }
    })
    expect(interpretResult.variableValue.success).toEqual(true)

    const variable = buildVariable({ formulaContext, meta, parseResult, interpretResult })
    await formulaContext.commitVariable({ variable })

    expect(formulaContext.findVariable(namespaceId, variableIds[5])!.t.variableValue.result.result).toEqual(5) // TODO 105
    expect(formulaContext.findVariable(namespaceId, variableIds[6])!.t.variableValue.result.result).toEqual(4) // TODO 104
    expect(formulaContext.reverseVariableDependencies).toMatchSnapshot()
    expect(
      Object.values(formulaContext.context).map(v => ({
        ...v.t,
        cst: null,
        variableValue: { ...v.t.variableValue, updatedAt: null }
      }))
    ).toMatchSnapshot()
  })
})
