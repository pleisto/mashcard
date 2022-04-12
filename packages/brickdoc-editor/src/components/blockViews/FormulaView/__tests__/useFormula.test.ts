import { FormulaContext, FormulaSourceType, quickInsert, VariableMetadata, VariableValue } from '@brickdoc/formula'
import { renderHook, act } from '@testing-library/react-hooks'
import { JSONContent } from '@tiptap/core'
import {
  buildJSONContentByArray,
  buildJSONContentByDefinition,
  contentArrayToInput,
  fetchJSONContentArray
} from '../../../../helpers'
import { useFormula } from '../useFormula'

const rootId = 'eb373fbc-a6e9-40a6-8c4b-45cda7230dda'
const formulaId = '2838c176-9a82-4e4f-a197-969d70c64694'
const updateFormula = (): void => {}
const normalFormulaType: FormulaSourceType = 'normal'
const formulaName = undefined
const formulaContext = new FormulaContext({ domain: 'test' })

const normalInput = {
  rootId,
  formulaId,
  updateFormula,
  formulaRichType: { type: normalFormulaType },
  formulaName,
  formulaContext
}

const spreadsheetFormulaType: FormulaSourceType = 'spreadsheet'
const spreadsheetInput = {
  rootId,
  formulaId,
  updateFormula,
  formulaRichType: { type: spreadsheetFormulaType, meta: { spreadsheetId: '', columnId: '', rowId: '' } },
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

const SNAPSHOT_FLAG = '<SNAPSHOT>'

const simpleCommonTestCases = [
  { input: '123', positions: [0, 1, 3], resultData: 123 },
  { input: '1 +　1 　 +　 　1', newInput: '1 + 1   +   1', positions: [0, 1, 13], resultData: 3 },
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
  { input: ' Untitled', positions: [1, 4, 9], newInput: ` #CurrentBlock`, resultData: 'BlockClass' },
  { input: `#${namespaceId}`, newInput: '#CurrentBlock', positions: [0], resultData: 'BlockClass' },
  { input: `#CurrentBlock`, positions: [0], resultData: 'BlockClass' },

  // Block dot
  { input: 'Untitled.', positions: [1, 4, 8, 9], newInput: `#CurrentBlock.`, resultData: 'Missing expression' },
  { input: `#CurrentBlock.`, positions: [0], resultData: 'Missing expression' },
  {
    input: `  #${namespaceId}  .`,
    newInput: `  #CurrentBlock  .`,
    positions: [0, 1],
    resultData: 'Missing expression'
  },

  // Variable simple
  { input: 'num1', newInput: '#CurrentBlock.num1', positions: [1, 2, 4], resultData: 2 },
  { input: '"num1"', newInput: `#CurrentBlock.num1`, resultData: 2 },
  { input: `#CurrentBlock.num1`, resultData: 2 },
  { input: `#${namespaceId}."num1"`, newInput: `#CurrentBlock.num1`, resultData: 2 },

  // Variable complex
  { input: 'foo_bar', newInput: '#CurrentBlock.foo_bar', positions: [3, 9], resultData: 123123 },
  { input: `#CurrentBlock.foo_bar`, resultData: 123123 },

  // Variable with space
  {
    input: '  num1  +  1  ',
    newInput: '  #CurrentBlock.num1  +  1  ',
    positions: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    resultData: 3
  },
  { input: ' "num1" + 1 ', newInput: ` #CurrentBlock.num1 + 1 `, resultData: 3 },
  { input: ` #${namespaceId}.num1 + 1 `, newInput: ` #CurrentBlock.num1 + 1 `, resultData: 3 },
  { input: ` #CurrentBlock.num1 + 1 `, resultData: 3 },
  { input: ` #${namespaceId}."num1" + 1 `, newInput: ` #CurrentBlock.num1 + 1 `, resultData: 3 },

  // Variable complex input
  { input: `+foo_bar`, resultData: 'Parse error: "+"' },
  { input: `+#CurrentBlock.foo_bar`, resultData: 'Parse error: "+"' },
  { input: `#CurrentBlock.foo_bar+`, resultData: 'Missing expression' },
  { input: `#CurrentBlock.foo_ba1r`, resultData: '"foo_ba1r" not found' },

  // Variable with error
  {
    input: ' " " & num1 ',
    newInput: ` " " & #CurrentBlock.num1 `,
    positions: [5, 6, 7, 8, 9, 10, 11, 12],
    resultData: 'Expected string but got number'
  },
  { input: ' num1 & " "', newInput: ' #CurrentBlock.num1 & " "', resultData: 'Expected string but got number' },
  { input: 'a+num1', newInput: 'a+#CurrentBlock.num1', positions: [1], resultData: 'Unknown function a' },

  { input: 'custom::ADD(1)', positions: [1, 12], resultData: 'Argument count mismatch' }
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
                display: '12'
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

    for (const meta of [...simpleMetas, ...complexMetas]) {
      await quickInsert({ ctx: { formulaContext, meta, interpretContext } })
    }
  })

  it('normal initial', () => {
    const { result } = renderHook(() => useFormula(spreadsheetInput))

    expect(result.current.variableT).toBe(undefined)
    expect(result.current.editorContent).toEqual({
      content: undefined,
      input: '',
      position: 0
    })
    expect(result.current.nameRef.current).toBe(undefined)
    expect(result.current.defaultName).toBe('var1')
  })
  it('spreadsheet initial', () => {
    const { result } = renderHook(() => useFormula(normalInput))

    expect(result.current.variableT).toBe(undefined)
    expect(result.current.editorContent).toEqual({
      content: undefined,
      input: '=',
      position: 0
    })
    expect(result.current.nameRef.current).toBe(undefined)
    expect(result.current.defaultName).toBe('var1')
  })

  it.each(simpleNormalTestCasesWithPosition)(
    'normal: "$input"($position) -> "$resultData"',
    async ({ input, newInput, position, resultData }) => {
      jest.useRealTimers()
      const { result } = renderHook(() => useFormula(normalInput))

      const editorPosition = position
      const jsonContent = buildJSONContentByArray([
        {
          type: 'text',
          text: input
        }
      ])

      await act(async () => {
        result.current.updateEditor(jsonContent, editorPosition)
        await new Promise(resolve => setTimeout(resolve, 50))
      })

      // expect(result.current.editorContent.position).toEqual(position)
      if (result.current.editorContent.position !== position) {
        // eslint-disable-next-line jest/no-conditional-expect
        expect(['Position unmatched', result.current.editorContent]).toMatchSnapshot()
      }
      expect(contentArrayToInput(fetchJSONContentArray(result.current.editorContent.content), namespaceId)).toEqual(
        newInput ?? input
      )

      const data = (result.current.variableT!.task.variableValue as VariableValue).result.result
      if (typeof data === 'object') {
        // eslint-disable-next-line jest/no-conditional-expect
        expect(data!.constructor.name).toEqual(resultData)
      } else {
        // eslint-disable-next-line jest/no-conditional-expect
        expect(data).toEqual(resultData)
      }
      jest.clearAllTimers()
    }
  )

  it.each(simpleSpreadsheetTestCasesWithPosition)(
    'spreadsheet: "$input"($position) -> "$resultData"',
    async ({ input, newInput, position, resultData }) => {
      jest.useRealTimers()
      const { result } = renderHook(() => useFormula(spreadsheetInput))

      const editorPosition = position
      const jsonContent = buildJSONContentByArray([
        {
          type: 'text',
          text: input
        }
      ])

      await act(async () => {
        result.current.updateEditor(jsonContent, editorPosition)
        await new Promise(resolve => setTimeout(resolve, 50))
      })

      // expect(result.current.editorContentRef.current.position).toEqual(position)
      if (result.current.editorContent.position !== position) {
        // eslint-disable-next-line jest/no-conditional-expect
        expect(['Position unmatched', result.current.editorContent]).toMatchSnapshot()
      }
      expect(contentArrayToInput(fetchJSONContentArray(result.current.editorContent.content), namespaceId)).toEqual(
        // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
        newInput ?? input
      )

      const data = (result.current.variableT!.task.variableValue as VariableValue).result.result
      if (typeof data === 'object') {
        // eslint-disable-next-line jest/no-conditional-expect
        expect(data!.constructor.name).toEqual(resultData)
      } else {
        // eslint-disable-next-line jest/no-conditional-expect
        expect(data).toEqual(resultData)
      }
      jest.clearAllTimers()
    }
  )

  it.each(normalTestCases)('normal $title', async ({ input, output }) => {
    jest.useRealTimers()
    const { result } = renderHook(() => useFormula(normalInput))

    const editorPosition = input.position
    const jsonContent = buildJSONContentByArray(input.content)

    await act(async () => {
      result.current.updateEditor(jsonContent, editorPosition)
      await new Promise(resolve => setTimeout(resolve, 50))
    })

    expect(result.current.editorContent.position).toEqual(output.position)
    if (output.content === SNAPSHOT_FLAG) {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(result.current.editorContent.content).toMatchSnapshot()
    } else {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(result.current.editorContent.content).toEqual(buildJSONContentByArray(output.content as JSONContent[]))
    }
    jest.clearAllTimers()
  })

  it.each(spreadsheetTestCases)('spreadsheet $title', async ({ input, output }) => {
    jest.useRealTimers()
    const { result } = renderHook(() => useFormula(spreadsheetInput))

    const editorPosition = input.position
    const jsonContent = buildJSONContentByArray(input.content)

    await act(async () => {
      result.current.updateEditor(jsonContent, editorPosition)
      await new Promise(resolve => setTimeout(resolve, 50))
    })

    expect(result.current.editorContent.position).toEqual(output.position)
    if (output.content === SNAPSHOT_FLAG) {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(result.current.editorContent.content).toMatchSnapshot()
    } else {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(result.current.editorContent.content).toEqual(buildJSONContentByArray(output.content as JSONContent[]))
    }
    jest.clearAllTimers()
  })

  // TODO refactor me
  // https://jestjs.io/docs/timer-mocks#advance-timers-by-time
  // await new Promise(resolve => setTimeout(resolve, 50))
  // jest.advanceTimersByTime(50)
  it('async', async () => {
    jest.useRealTimers()
    const { result } = renderHook(() => useFormula(normalInput))

    const content = buildJSONContentByDefinition('SLEEP(111)')!

    await act(async () => {
      result.current.updateEditor(content, 0)
    })

    expect(result.current.variableT?.valid).toEqual(true)
    expect(result.current.variableT!.task.async).toEqual(true)

    await new Promise(resolve => setTimeout(resolve, 50))
    expect(result.current.variableT!.task.async).toEqual(true)

    await new Promise(resolve => setTimeout(resolve, 200))
    expect(result.current.variableT!.task.async).toEqual(false)
    jest.clearAllTimers()
  })
})
