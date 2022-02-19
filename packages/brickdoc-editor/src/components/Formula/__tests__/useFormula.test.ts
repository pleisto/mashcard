import { FormulaContext, FormulaSourceType, quickInsert, VariableMetadata } from '@brickdoc/formula'
import { BrickdocEventBus, FormulaEditorUpdateEventTrigger } from '@brickdoc/schema'
import { renderHook, act } from '@testing-library/react-hooks'
import { JSONContent } from '@tiptap/core'
import { buildJSONContentByArray, contentArrayToInput, fetchJSONContentArray } from '../../../helpers'
import { useFormula } from '../useFormula'

const rootId = 'eb373fbc-a6e9-40a6-8c4b-45cda7230dda'
const formulaId = '2838c176-9a82-4e4f-a197-969d70c64694'
const updateFormula = () => {}
const normalFormulaType: FormulaSourceType = 'normal'
const formulaName = undefined
const formulaContext = new FormulaContext({})

const normalInput = {
  rootId,
  formulaId,
  updateFormula,
  formulaType: normalFormulaType,
  formulaName,
  formulaContext
}

const spreadsheetFormulaType: FormulaSourceType = 'spreadsheet'
const spreadsheetInput = {
  rootId,
  formulaId,
  updateFormula,
  formulaType: spreadsheetFormulaType,
  formulaName,
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

const asyncForEach = async (
  array: string | any[],
  callback: { (meta: VariableMetadata): Promise<void>; (arg0: any, arg1: number, arg2: any): any }
): Promise<void> => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}

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
    return `#${namespaceId}."${variableWithNames.find(v => v.name === variableName)!.name}"`
  })
}))

const complexMetas: VariableMetadata[] = [
  {
    name: 'foo bar',
    input: '=123123',
    position: 0,
    namespaceId,
    type: 'normal',
    variableId: '781a575f-37a6-4e03-b125-595b72b8d6fe'
  }
]

const SNAPSHOT_FLAG = '<SNAPSHOT>'

const simpleCommonTestCases = [
  { input: '123', positions: [0, 1, 3], resultData: 123 },
  { input: '  123     ', positions: [1, 2, 4, 6, 8], resultData: 123 },
  { input: '123asdasd', positions: [1, 9], resultData: 'Not all input parsed: asdasd' },
  { input: '1 1', positions: [1, 2, 3], resultData: 'Not all input parsed: 1' },
  { input: '1  1', positions: [1, 2, 3, 4], resultData: 'Not all input parsed: 1' },
  { input: '1  a', positions: [1, 2, 3], resultData: 'Not all input parsed: a' },
  { input: 'a a', positions: [1, 3], resultData: 'Function a not found' },
  { input: 'a123 1', positions: [4, 5, 6], resultData: 'Function a123 not found' },
  { input: 'a123 ', resultData: 'Unknown function a123' },
  { input: ' 123   + 123 ', resultData: 246 },
  { input: ' barasd asd 123   + 123 1 ', resultData: 'Function barasd not found' },
  { input: ' 123 ', resultData: 123 },
  { input: ' a123', resultData: 'Unknown function a123' },
  { input: '    a123 ', positions: [1, 3, 5], resultData: 'Unknown function a123' },

  // Block
  { input: ' Untitled', positions: [1, 4, 9], newInput: ` #${namespaceId}`, resultData: 'BlockClass' },
  { input: `#${namespaceId}`, positions: [0], resultData: 'BlockClass' },

  // Block dot
  { input: 'Untitled.', positions: [1, 4, 8, 9], newInput: `#${namespaceId}.`, resultData: 'Missing expression' },
  { input: `#${namespaceId}.`, positions: [0], resultData: 'Missing expression' },
  { input: `  #${namespaceId}  .`, positions: [0, 1], resultData: 'Missing expression' },

  // Variable simple
  { input: 'num1', positions: [1, 2, 4], newInput: `#${namespaceId}.num1`, resultData: 2 },
  { input: '"num1"', newInput: `#${namespaceId}.num1`, resultData: 2 },
  { input: `#${namespaceId}.num1`, resultData: 2 },
  { input: `#${namespaceId}."num1"`, newInput: `#${namespaceId}.num1`, resultData: 2 },

  // Variable complex
  { input: '"foo bar"', positions: [3, 9], newInput: `#${namespaceId}."foo bar"`, resultData: 123123 },
  { input: `#${namespaceId}."foo bar"`, resultData: 123123 },

  // Variable with space
  {
    input: '  num1  +  1  ',
    positions: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    newInput: `  #${namespaceId}.num1  +  1  `,
    resultData: 3
  },
  { input: ' "num1" + 1 ', newInput: ` #${namespaceId}.num1 + 1 `, resultData: 3 },
  { input: ` #${namespaceId}.num1 + 1 `, resultData: 3 },
  { input: ` #${namespaceId}."num1" + 1 `, newInput: ` #${namespaceId}.num1 + 1 `, resultData: 3 },

  // Variable complex input
  { input: `+#${namespaceId}."foo bar"`, resultData: 'Parse error: "+"' },
  { input: `#${namespaceId}."foo bar"+`, resultData: 'Missing right expression' },
  { input: `#${namespaceId}."foo ba1r"`, resultData: 'Variable "foo ba1r" not found' },

  // Variable with error
  {
    input: ' " " & num1 ',
    positions: [5, 6, 7, 8, 9, 10, 11, 12],
    newInput: ` " " & #${namespaceId}.num1 `,
    resultData: 'Expected string but got number'
  },
  { input: ' num1 & " "', newInput: ` #${namespaceId}.num1 & " "`, resultData: 'Expected string but got number' }

  // TODO parse error
  // { input: 'a+num1', positions: [1], newInput: 'a.num1', resultData: 'Unknown function a' }
]

const simpleNormalTestCases = [
  { input: '', newInput: undefined, positions: [], resultData: undefined },
  ...simpleCommonTestCases
]

const simpleNormalTestCasesWithPosition = simpleNormalTestCases.flatMap(t =>
  (t.positions ?? [0]).map(p => ({ ...t, position: p }))
)

const simpleSpreadsheetTestCases = [
  { input: '', newInput: undefined, positions: [], resultData: '' },
  { input: '=', newInput: undefined, positions: [], resultData: '=' },
  { input: '=  ', newInput: undefined, positions: [], resultData: '=  ' },

  { input: ' =', newInput: undefined, positions: [], resultData: ' =' },
  { input: ' foo baz ', newInput: undefined, positions: [], resultData: ' foo baz ' },
  { input: '   ', newInput: undefined, positions: [], resultData: '   ' },

  ...simpleCommonTestCases.map(({ input, newInput, positions, resultData }) => ({
    input: `=${input}`,
    newInput: newInput ? `=${newInput}` : undefined,
    positions,
    resultData
  }))
]

const simpleSpreadsheetTestCasesWithPosition = simpleSpreadsheetTestCases.flatMap(t =>
  (t.positions ?? [0]).map(p => ({ ...t, position: p }))
)

const normalTestCases = [
  {
    title: 'constant 1',
    input: {
      position: 2,
      content: [
        {
          type: 'text',
          text: '12',
          marks: [
            {
              type: 'FormulaType',
              attrs: {
                code: 'NumberLiteral',
                errors: [],
                type: 'number',
                display: '12',
                value: '12'
              }
            }
          ]
        }
      ]
    },
    output: {
      position: 2,
      content: [
        {
          type: 'text',
          text: '12',
          marks: [
            {
              type: 'FormulaType',
              attrs: {
                attrs: undefined,
                code: 'NumberLiteral',
                errors: [],
                type: 'number',
                display: '12',
                value: '12',
                renderText: undefined,
                hide: false
              }
            }
          ]
        }
      ]
    }
  },
  {
    title: 'expression 1',
    input: {
      position: 3,
      content: [
        {
          type: 'text',
          text: 'num1'
        }
      ]
    },
    output: {
      position: 3,
      content: SNAPSHOT_FLAG
    }
  }
]

const spreadsheetTestCases = [
  {
    title: 'constant 1',
    input: {
      position: 2,
      content: [
        {
          type: 'text',
          text: '=12'
        }
      ]
    },
    output: {
      position: 2,
      content: [
        {
          type: 'text',
          text: '=',
          marks: [
            {
              type: 'FormulaType',
              attrs: {
                attrs: undefined,
                code: 'Equal',
                errors: [],
                type: 'any',
                display: '=',
                value: '=',
                renderText: undefined,
                hide: false
              }
            }
          ]
        },
        {
          type: 'text',
          text: '12',
          marks: [
            {
              type: 'FormulaType',
              attrs: {
                attrs: undefined,
                code: 'NumberLiteral',
                errors: [],
                type: 'number',
                display: '12',
                value: '12',
                renderText: undefined,
                hide: false
              }
            }
          ]
        }
      ]
    }
  },
  {
    title: 'expression 1',
    input: {
      position: 3,
      content: [
        {
          type: 'text',
          text: '=num1'
        }
      ]
    },
    output: {
      position: 3,
      content: SNAPSHOT_FLAG
    }
  }
]

describe('useFormula', () => {
  beforeEach(async () => {
    formulaContext.resetFormula()

    await asyncForEach([...simpleMetas, ...complexMetas], async (meta: VariableMetadata) => {
      await quickInsert({ ctx: { formulaContext, meta, interpretContext } })
    })
  })
  it('normal initial', () => {
    const { result } = renderHook(() => useFormula(spreadsheetInput))

    expect(result.current.variableT).toBe(undefined)
    expect(result.current.editorContent).toEqual({
      content: undefined,
      input: '',
      position: 0
    })
    expect(result.current.name).toBe(undefined)
    expect(result.current.defaultName).toBe('var1')
  })
  it('spreadsheet initial', () => {
    const { result } = renderHook(() => useFormula(normalInput))

    expect(result.current.variableT).toBe(undefined)
    expect(result.current.editorContent).toEqual({
      content: undefined,
      input: '',
      position: 0
    })
    expect(result.current.name).toBe(undefined)
    expect(result.current.defaultName).toBe('var1')
  })

  it.each(simpleNormalTestCasesWithPosition)(
    'normal: "$input"($position) -> "$resultData"',
    async ({ input, newInput, position, resultData }) => {
      const { result, waitForNextUpdate } = renderHook(() => useFormula(normalInput))

      const editorPosition = position
      const jsonContent = buildJSONContentByArray([
        {
          type: 'text',
          text: input
        }
      ])

      act(() => {
        BrickdocEventBus.dispatch(
          FormulaEditorUpdateEventTrigger({ position: editorPosition, content: jsonContent, formulaId, rootId })
        )
      })

      await waitForNextUpdate()

      // expect(result.current.editorContentRef.current.position).toEqual(position)
      if (result.current.editorContent.position !== position) {
        // eslint-disable-next-line jest/no-conditional-expect
        expect(result.current.editorContent).toMatchSnapshot()
      }
      expect(contentArrayToInput(fetchJSONContentArray(result.current.editorContent.content))).toEqual(
        newInput ?? input
      )

      const data = result.current.variableT?.variableValue.result.result
      if (typeof data === 'object') {
        // eslint-disable-next-line jest/no-conditional-expect
        expect(data!.constructor.name).toEqual(resultData)
      } else {
        // eslint-disable-next-line jest/no-conditional-expect
        expect(data).toEqual(resultData)
      }
    }
  )

  it.each(simpleSpreadsheetTestCasesWithPosition)(
    'spreadsheet: "$input"($position) -> "$resultData"',
    async ({ input, newInput, position, resultData }) => {
      const { result, waitForNextUpdate } = renderHook(() => useFormula(spreadsheetInput))

      const editorPosition = position
      const jsonContent = buildJSONContentByArray([
        {
          type: 'text',
          text: input
        }
      ])

      act(() => {
        BrickdocEventBus.dispatch(
          FormulaEditorUpdateEventTrigger({ position: editorPosition, content: jsonContent, formulaId, rootId })
        )
      })

      await waitForNextUpdate()

      // expect(result.current.editorContentRef.current.position).toEqual(position)
      if (result.current.editorContent.position !== position) {
        // eslint-disable-next-line jest/no-conditional-expect
        expect(result.current.editorContent).toMatchSnapshot()
      }
      expect(contentArrayToInput(fetchJSONContentArray(result.current.editorContent.content))).toEqual(
        // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
        newInput || input
      )

      const data = result.current.variableT?.variableValue.result.result
      if (typeof data === 'object') {
        // eslint-disable-next-line jest/no-conditional-expect
        expect(data!.constructor.name).toEqual(resultData)
      } else {
        // eslint-disable-next-line jest/no-conditional-expect
        expect(data).toEqual(resultData)
      }
    }
  )

  it.each(normalTestCases)('normal $title', async ({ input, output }) => {
    const { result, waitForNextUpdate } = renderHook(() => useFormula(normalInput))

    const editorPosition = input.position
    const jsonContent = buildJSONContentByArray(input.content)

    act(() => {
      BrickdocEventBus.dispatch(
        FormulaEditorUpdateEventTrigger({ position: editorPosition, content: jsonContent, formulaId, rootId })
      )
    })

    await waitForNextUpdate()

    expect(result.current.editorContent.position).toEqual(output.position)
    if (output.content === SNAPSHOT_FLAG) {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(result.current.editorContent.content).toMatchSnapshot()
    } else {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(result.current.editorContent.content).toEqual(buildJSONContentByArray(output.content as JSONContent[]))
    }
  })

  it.each(spreadsheetTestCases)('spreadsheet $title', async ({ input, output }) => {
    const { result, waitForNextUpdate } = renderHook(() => useFormula(spreadsheetInput))

    const editorPosition = input.position
    const jsonContent = buildJSONContentByArray(input.content)

    act(() => {
      BrickdocEventBus.dispatch(
        FormulaEditorUpdateEventTrigger({ position: editorPosition, content: jsonContent, formulaId, rootId })
      )
    })

    await waitForNextUpdate()

    expect(result.current.editorContent.position).toEqual(output.position)
    if (output.content === SNAPSHOT_FLAG) {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(result.current.editorContent.content).toMatchSnapshot()
    } else {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(result.current.editorContent.content).toEqual(buildJSONContentByArray(output.content as JSONContent[]))
    }
  })
})
