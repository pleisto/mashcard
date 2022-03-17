import { FormulaContext, FunctionContext, parse, quickInsert, VariableMetadata } from '@brickdoc/formula'

const formulaContext = new FormulaContext({ domain: 'test' })

const namespaceId = 'eb373fbc-a6e9-40a6-8c4b-45cda7230dda'
const fooNamespaceId = '35d0e954-8e6d-47d4-8e4c-6eda00bec83d'
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

const simpleMetas: VariableMetadata[] = [
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
  type: 'normal',
  position: 0,
  variableId: variableWithNames.find(v => v.name === name)!.variableId,
  input: input.replace(/\$([a-zA-Z0-9_-]+)/g, (a, variableName): string => {
    return `#CurrentBlock."${variableWithNames.find(v => v.name === variableName)!.name}"`
  })
}))

const complexMetas: VariableMetadata[] = [
  {
    name: 'foo',
    input: '=123123',
    position: 0,
    namespaceId: fooNamespaceId,
    type: 'normal',
    variableId: '781a575f-37a6-4e03-b125-595b72b8d6fe'
  }
]

const name = 'foo'
const meta: VariableMetadata = {
  variableId: '3e845346-cdcf-4e56-8c0e-7a2419ec1e78',
  namespaceId,
  name,
  input: '!!!',
  position: 0,
  type: 'normal'
}

const ctx: FunctionContext = {
  formulaContext,
  meta,
  interpretContext: {
    ctx: { bar: { type: 'string', result: 'bar123' } },
    arguments: [{ type: 'string', result: 'Foo1234123' }]
  }
}

const validInputs: string[] = [
  '1',
  'a',
  '1+123',
  ' 1  +  1 +  ',
  '(',
  ')',
  '()',
  '[',
  ']',
  '[]',
  '{',
  '}',
  '{}',
  ')=',
  '>=',
  '<',
  '<>',
  'ABS(1 {a: 1}.a',
  '(1 {}.'
]

describe('parser', () => {
  beforeEach(async () => {
    formulaContext.resetFormula()

    for (const meta of [...simpleMetas, ...complexMetas]) {
      await quickInsert({ ctx: { formulaContext, meta, interpretContext } })
    }
  })
  it.each(validInputs)('valid: "=%s"', i => {
    const input = `=${i}`
    const { input: newInput, codeFragments } = parse({ ctx: { ...ctx, meta: { ...meta, input } } })
    expect(codeFragments.map(c => c.display).join('')).toEqual(newInput)
  })
})
