import { makeContext, VariableValue } from '@brickdoc/formula'
import { BrickdocEventBus, FormulaEditorUpdateTrigger } from '@brickdoc/schema'
import { renderHook, act } from '@testing-library/react-hooks'
import { JSONContent } from '@tiptap/core'
import {
  buildJSONContentByArray,
  buildJSONContentByDefinition,
  contentArrayToInput,
  fetchJSONContentArray
} from '../../../../helpers'
import { useFormula, UseFormulaInput } from '../useFormula'

const rootId = 'bbbbbbbb-bbbb-4444-8888-444444444444'
const formulaId = '2838c176-9a82-4e4f-a197-969d70c64694'
const onUpdateFormula = (): void => {}

const SNAPSHOT_FLAG = '<SNAPSHOT>'

const simpleCommonTestCases = [
  { input: '=', positions: [0], resultData: 'TODO mismatch token startExpression' },
  { input: '==', positions: [0], resultData: 'Missing expression' },
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
  { input: `#${rootId}`, newInput: '#CurrentBlock', positions: [0], resultData: 'BlockClass' },
  { input: `#CurrentBlock`, positions: [0], resultData: 'BlockClass' },

  // Block dot
  { input: 'Untitled.', positions: [1, 4, 8, 9], newInput: `#CurrentBlock.`, resultData: 'Missing expression' },
  { input: `#CurrentBlock.`, positions: [0], resultData: 'Missing expression' },
  {
    input: `  #${rootId}  .`,
    newInput: `  #CurrentBlock  .`,
    positions: [0, 1],
    resultData: 'Missing expression'
  },

  // Variable simple
  { input: 'num1', newInput: '#CurrentBlock.num1', positions: [1, 2, 4], resultData: 2 },
  { input: '"num1"', newInput: `#CurrentBlock.num1`, resultData: 2 },
  { input: `#CurrentBlock.num1`, resultData: 2 },
  { input: `#${rootId}."num1"`, newInput: `#CurrentBlock.num1`, resultData: 2 },

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
  { input: ` #${rootId}.num1 + 1 `, newInput: ` #CurrentBlock.num1 + 1 `, resultData: 3 },
  { input: ` #CurrentBlock.num1 + 1 `, resultData: 3 },
  { input: ` #${rootId}."num1" + 1 `, newInput: ` #CurrentBlock.num1 + 1 `, resultData: 3 },

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
  { input: '', newInput: undefined, positions: [0], resultData: 'Parse error: ""' },
  ...simpleCommonTestCases
]

const simpleNormalTestCasesWithPosition = simpleNormalTestCases.flatMap(t =>
  (t.positions ?? [0]).map(p => ({ ...t, position: p }))
)

const simpleSpreadsheetTestCases = [
  { input: '', newInput: undefined, positions: [0], resultData: '' },
  { input: '=', newInput: undefined, positions: [0], resultData: '=' },
  { input: '=  ', newInput: undefined, positions: [0], resultData: '=  ' },

  { input: ' =', newInput: undefined, positions: [0], resultData: ' =' },
  { input: ' foo baz ', newInput: undefined, positions: [0], resultData: ' foo baz ' },
  { input: '   ', newInput: undefined, positions: [0], resultData: '   ' },

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

const updateEditor = async (content: JSONContent, position: number): Promise<void> => {
  const result = BrickdocEventBus.dispatch(FormulaEditorUpdateTrigger({ formulaId, rootId, content, position }))

  await Promise.all(result)
}

// eslint-disable-next-line jest/no-disabled-tests
describe.skip('useFormula', () => {
  let ctx: Awaited<ReturnType<typeof makeContext>>
  let useFormulaNormalInput: UseFormulaInput
  let useFormulaSpreadsheetInput: UseFormulaInput
  beforeAll(async () => {
    jest.useRealTimers()
    ctx = await makeContext({
      pages: [
        {
          pageName: 'formulaType',
          pageId: rootId,
          variables: [
            { variableName: 'foo_bar', definition: '=123123' },
            { variableName: 'num0', definition: '=1' },
            { variableName: 'num1', definition: '=2' },
            { variableName: 'num2', definition: '=num1+1' }
          ]
        }
      ]
    })
    useFormulaNormalInput = {
      onUpdateFormula,
      formulaContext: ctx.formulaContext,
      meta: ctx.buildMeta({
        definition: '',
        variableId: formulaId,
        namespaceId: rootId
      })
    }
    useFormulaSpreadsheetInput = {
      ...useFormulaNormalInput,
      meta: {
        ...useFormulaNormalInput.meta,
        richType: {
          type: 'spreadsheet',
          meta: { spreadsheetId: '', columnId: '', rowId: '' }
        }
      }
    }
    jest.clearAllTimers()
  })

  it('normal initial', () => {
    const { result } = renderHook(() => useFormula(useFormulaSpreadsheetInput))

    expect(result.current.temporaryVariableT).toBe(undefined)
    expect(result.current.content).toEqual(undefined)
    expect(result.current.nameRef.current.name).toBe('')
    expect(result.current.nameRef.current.defaultName).toBe('var1')
  })
  it('spreadsheet initial', () => {
    const { result } = renderHook(() => useFormula(useFormulaNormalInput))

    expect(result.current.temporaryVariableT).toBe(undefined)
    expect(result.current.content).toEqual(undefined)
    expect(result.current.nameRef.current.name).toBe('')
    expect(result.current.nameRef.current.defaultName).toBe('var1')
  })

  it.each(simpleNormalTestCasesWithPosition)(
    'normal: "$input"($position) -> "$resultData"',
    async ({ input, newInput, position, resultData }) => {
      jest.useRealTimers()
      const { result } = renderHook(() => useFormula(useFormulaNormalInput))

      const editorPosition = position
      const jsonContent = buildJSONContentByArray([
        {
          type: 'text',
          text: input
        }
      ])

      await act(async () => {
        await updateEditor(jsonContent, editorPosition)
        await new Promise(resolve => setTimeout(resolve, 50))
      })

      const { position: newPosition, definition: newDefinition } =
        result.current.temporaryVariableT!.variableParseResult

      // expect(result.current.editorContent.position).toEqual(position)
      if (newPosition !== position) {
        // eslint-disable-next-line jest/no-conditional-expect
        expect([
          'Position unmatched',
          { content: result.current.content, input: newDefinition, position: newPosition }
        ]).toMatchSnapshot()
      }
      expect(contentArrayToInput(fetchJSONContentArray(result.current.content), rootId)).toEqual(newInput ?? input)

      const data = (result.current.temporaryVariableT!.task.variableValue as VariableValue).result.result
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
      const { result } = renderHook(() => useFormula(useFormulaSpreadsheetInput))

      const editorPosition = position
      const jsonContent = buildJSONContentByArray([
        {
          type: 'text',
          text: input
        }
      ])

      await act(async () => {
        await updateEditor(jsonContent, editorPosition)
        await new Promise(resolve => setTimeout(resolve, 50))
      })

      const { position: newPosition, definition: newDefinition } =
        result.current.temporaryVariableT!.variableParseResult

      // expect(result.current.editorContentRef.current.position).toEqual(position)
      if (newPosition !== position) {
        // eslint-disable-next-line jest/no-conditional-expect
        expect([
          'Position unmatched',
          { content: result.current.content, input: newDefinition, position: newPosition }
        ]).toMatchSnapshot()
      }
      expect(contentArrayToInput(fetchJSONContentArray(result.current.content), rootId)).toEqual(
        // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
        newInput ?? input
      )

      const data = (result.current.temporaryVariableT!.task.variableValue as VariableValue).result.result
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
    const { result } = renderHook(() => useFormula(useFormulaNormalInput))

    const editorPosition = input.position
    const jsonContent = buildJSONContentByArray(input.content)

    await act(async () => {
      await updateEditor(jsonContent, editorPosition)
      await new Promise(resolve => setTimeout(resolve, 50))
    })

    expect(result.current.temporaryVariableT!.variableParseResult.position).toEqual(output.position)
    if (output.content === SNAPSHOT_FLAG) {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(result.current.content).toMatchSnapshot()
    } else {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(result.current.content).toEqual(buildJSONContentByArray(output.content as JSONContent[]))
    }
    jest.clearAllTimers()
  })

  it.each(spreadsheetTestCases)('spreadsheet $title', async ({ input, output }) => {
    jest.useRealTimers()
    const { result } = renderHook(() => useFormula(useFormulaSpreadsheetInput))

    const editorPosition = input.position
    const jsonContent = buildJSONContentByArray(input.content)

    await act(async () => {
      await updateEditor(jsonContent, editorPosition)
      await new Promise(resolve => setTimeout(resolve, 50))
    })

    expect(result.current.temporaryVariableT!.variableParseResult.position).toEqual(output.position)
    if (output.content === SNAPSHOT_FLAG) {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(result.current.content).toMatchSnapshot()
    } else {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(result.current.content).toEqual(buildJSONContentByArray(output.content as JSONContent[]))
    }
    jest.clearAllTimers()
  })

  // TODO refactor me
  // https://jestjs.io/docs/timer-mocks#advance-timers-by-time
  // await new Promise(resolve => setTimeout(resolve, 50))
  // jest.advanceTimersByTime(50)
  it('async', async () => {
    jest.useRealTimers()
    const { result } = renderHook(() => useFormula(useFormulaNormalInput))

    const content = buildJSONContentByDefinition('SLEEP(111)')!

    await act(async () => {
      await updateEditor(content, 0)
    })

    expect(result.current.temporaryVariableT!.variableParseResult.valid).toEqual(true)
    expect(result.current.temporaryVariableT!.task.async).toEqual(true)

    await new Promise(resolve => setTimeout(resolve, 50))
    expect(result.current.temporaryVariableT!.task.async).toEqual(true)

    await new Promise(resolve => setTimeout(resolve, 200))
    expect(result.current.temporaryVariableT!.task.async).toEqual(false)
    jest.clearAllTimers()
  })
})
