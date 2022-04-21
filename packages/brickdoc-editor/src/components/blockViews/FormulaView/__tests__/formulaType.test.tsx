import { FormulaContext, FormulaSourceType, quickInsert, VariableMetadata } from '@brickdoc/formula'
import { renderHook, act } from '@testing-library/react-hooks'
import { buildJSONContentByArray, codeFragmentsToJSONContentTotal } from '../../../../helpers'
import { useFormula, UseFormulaInput } from '../useFormula'

import { render } from '@testing-library/react'
import { TestEditorContent } from '../../../../test/testEditor'
import { FormulaType } from '../../../../extensions/marks/formulaType'

const rootId = 'eb373fbc-a6e9-40a6-8c4b-45cda7230dda'
const formulaId = '2838c176-9a82-4e4f-a197-969d70c64694'
const onUpdateFormula = (): void => {}
const normalFormulaType: FormulaSourceType = 'normal'
const formulaName = ''
const formulaContext = new FormulaContext({ domain: 'test' })

const normalInput: UseFormulaInput = {
  meta: {
    namespaceId: rootId,
    variableId: formulaId,
    name: formulaName,
    richType: { type: normalFormulaType }
  },
  onUpdateFormula,
  formulaContext
}

const spreadsheetFormulaType: FormulaSourceType = 'spreadsheet'
const spreadsheetInput: UseFormulaInput = {
  meta: {
    namespaceId: rootId,
    variableId: formulaId,
    name: formulaName,
    richType: { type: spreadsheetFormulaType, meta: { spreadsheetId: '', columnId: '', rowId: '' } }
  },
  onUpdateFormula,
  formulaContext
}

const namespaceId = rootId
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
  richType: { type: 'normal' },
  position: 0,
  variableId: variableWithNames.find(v => v.name === name)!.variableId,
  input: input.replace(/\$([a-zA-Z0-9_-]+)/g, (a, variableName): string => {
    return `#CurrentBlock."${variableWithNames.find(v => v.name === variableName)!.name}"`
  })
}))

const complexMetas: VariableMetadata[] = [
  {
    name: 'foo_bar',
    input: '=123123',
    position: 0,
    namespaceId,
    richType: { type: 'normal' },
    variableId: '781a575f-37a6-4e03-b125-595b72b8d6fe'
  }
]

const simpleCommonTestCases = [
  '123',
  ' 1 + 1  +  1 ',
  '123asdasd',
  'a123 1',
  `#CurrentBlock`,
  `#CurrentBlock.num1`,
  'foo_bar',
  ' " " & num1 ',
  'a+num1',
  'custom::ADD(1)'
]

interface TestCase {
  input: string
  type: 'normal' | 'spreadsheet'
}

const simpleNormalTestCases: TestCase[] = ['', ...simpleCommonTestCases].map(c => ({
  input: c,
  type: 'normal'
}))

const simpleSpreadsheetTestCases: TestCase[] = [
  '',
  '=',
  ' foo baz ',
  '   ',
  ...simpleCommonTestCases.map(input => `=${input}`)
].map(c => ({ input: c, type: 'spreadsheet' }))

describe('formulaType', () => {
  beforeEach(async () => {
    formulaContext.resetFormula()

    for (const meta of [...simpleMetas, ...complexMetas]) {
      await quickInsert({ ctx: { formulaContext, meta, interpretContext } })
    }
  })
  it.each([...simpleNormalTestCases, ...simpleSpreadsheetTestCases])('"$type" - "$input"', async ({ type, input }) => {
    const { result } = renderHook(() => useFormula(type === 'normal' ? normalInput : spreadsheetInput))

    const editorPosition = 0
    const jsonContent = buildJSONContentByArray([
      {
        type: 'text',
        text: input
      }
    ])

    await act(async () => {
      result.current.updateEditor(jsonContent, editorPosition)
    })

    const content = codeFragmentsToJSONContentTotal(result.current.variableT!.codeFragments)

    const { container } = render(<TestEditorContent content={content} extensions={[FormulaType]} />)

    expect(container).toMatchSnapshot()
  })
})
