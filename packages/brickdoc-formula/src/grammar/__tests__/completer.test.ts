import { parse } from '../core'
import { CodeFragment } from '../../types'
import { FormulaContext } from '../../context'
import { FormulaLexer } from '../lexer'
import { complete } from '../completer'
import { quickInsert } from '../testHelper'

const formulaContext = new FormulaContext({})
const namespaceId = '57622108-1337-4edd-833a-2557835bcfe0'
const variableId = '481b6dd1-e668-4477-9e47-cfe5cb1239d0'
const barVariableId = '28e28190-63bd-4f70-aeca-26e72574c01a'
const test2VariableId = '99499117-5694-4d83-9ccd-85a3ab0b8f25'
const testNamespaceId = 'cd4f6e1e-765e-4064-badd-b5585c7eff8e'
const testVariableId = 'd986e871-cb85-4bd5-b675-87307f60b882'

const interpretContext = { ctx: {}, arguments: [] }

// const testName1 = 'varvarabc中文var'
const testName1 = 'varvarabcvar'
// TODO Chinese name
const testName2 = '中文baz345'

const meta = { namespaceId, variableId, name: testName1, input: '=24' }
const barMeta = { namespaceId, variableId: barVariableId, name: 'bar', input: '=43' }
const test2Meta = { namespaceId, variableId: test2VariableId, name: testName2, input: '=80' }
describe('Complete', () => {
  beforeAll(async () => {
    await quickInsert({ ctx: { formulaContext, meta, interpretContext } })
    await quickInsert({ ctx: { formulaContext, meta: barMeta, interpretContext } })
    await quickInsert({ ctx: { formulaContext, meta: test2Meta, interpretContext } })
  })

  it('basic', () => {
    const input = '=123'
    const lexResult = FormulaLexer.tokenize(input)
    const tokens = lexResult.tokens
    const codeFragments: CodeFragment[] = []

    const completions = complete({
      formulaContext,
      input,
      tokens,
      variableId: testVariableId,
      namespaceId,
      codeFragments
    })
    expect(completions.length).not.toBe(0)
    expect(completions[0].kind).toBe('variable')

    const completions2 = complete({
      formulaContext,
      input,
      tokens,
      variableId: testVariableId,
      namespaceId: testNamespaceId,
      codeFragments
    })
    expect(completions2[0].kind).toBe('function')
  })

  interface TestCase {
    input: string
    label: string
    namespaceId: string
    expectInputImage: string
    expectParseImage: string
    expectNewInput: string
    weight: number
    errorMessage: string | undefined
  }

  const testCases: TestCase[] = [
    {
      label: 'var startWith same namespace',
      input: '= 1 + var',
      namespaceId,
      errorMessage: 'Unknown function var',
      weight: 101,
      expectInputImage: '=1+var',
      expectParseImage: '=1+var',
      expectNewInput: '= 1 + var'
    },
    {
      label: 'block completion',
      input: `=#${namespaceId}.`,
      namespaceId,
      errorMessage: 'Missing expression',
      weight: 1001,
      expectParseImage: `=#${namespaceId}.`,
      expectInputImage: `=#${namespaceId}.`,
      expectNewInput: `=#${namespaceId}.`
    },
    {
      label: 'var equal different namespaceId',
      input: `=${testName1}`,
      namespaceId: testNamespaceId,
      errorMessage: undefined,
      weight: 0,
      expectParseImage: `=#${namespaceId}.${variableId}`,
      expectInputImage: `=#${namespaceId}.${variableId}`,
      expectNewInput: `=#${namespaceId}.${variableId}`
    },
    {
      label: 'var equal same namespaceId',
      input: `=${testName1}`,
      namespaceId,
      errorMessage: undefined,
      weight: 1,
      expectParseImage: `=#${namespaceId}.${variableId}`,
      expectInputImage: `=#${namespaceId}.${variableId}`,
      expectNewInput: `=#${namespaceId}.${variableId}`
    },
    {
      label: 'var include same namespaceId',
      input: `=1+arvar`,
      namespaceId,
      errorMessage: 'Unknown function arvar',
      weight: 11,
      expectInputImage: '=1+arvar',
      expectParseImage: '=1+arvar',
      expectNewInput: '=1+arvar'
    },
    {
      label: 'var include different namespaceId',
      input: `=1+arvar`,
      namespaceId: testNamespaceId,
      errorMessage: 'Unknown function arvar',
      weight: 9,
      expectInputImage: '=1+arvar',
      expectParseImage: '=1+arvar',
      expectNewInput: '=1+arvar'
    },
    // {
    //   label: 'space equal same namespaceId',
    //   input: `= 1 + ${testName1} `,
    //   namespaceId,
    //   errorMessage: undefined,
    //   weight: 1001,
    //   expectParseImage: `=1+#${namespaceId}.${variableId}`,
    //   expectInputImage: `=1+#${namespaceId}.${variableId}`,
    //   expectNewInput: `= 1 + #${namespaceId}.${variableId} `
    // },
    // {
    //   label: 'space equal same namespaceId',
    //   input: `= 1 + ${testName1} `,
    //   namespaceId: testNamespaceId,
    //   errorMessage: undefined,
    //   weight: 999,
    //   expectParseImage: `=1+#${namespaceId}.${variableId}`,
    //   expectInputImage: `=1+#${namespaceId}.${variableId}`,
    //   expectNewInput: `= 1 + #${namespaceId}.${variableId} `
    // },
    {
      label: 'dot equal same namespaceId',
      input: `= 1 + ${testName1}.`,
      namespaceId,
      errorMessage: 'Missing expression',
      weight: 125,
      expectParseImage: `=1+#${namespaceId}.${variableId}.`,
      expectInputImage: `=1+#${namespaceId}.${variableId}.`,
      expectNewInput: `=1+#${namespaceId}.${variableId}.`
    },
    {
      label: 'dot equal different namespaceId',
      input: `= 1 + ${testName1}.`,
      namespaceId: testNamespaceId,
      errorMessage: 'Missing expression',
      weight: 125,
      expectParseImage: `=1+#${namespaceId}.${variableId}.`,
      expectInputImage: `=1+#${namespaceId}.${variableId}.`,
      expectNewInput: `=1+#${namespaceId}.${variableId}.`
    }
  ]

  testCases.forEach(
    ({
      input,
      label,
      weight,
      errorMessage,
      expectInputImage,
      namespaceId: testcaseNamespaceId,
      expectParseImage,
      expectNewInput
    }) => {
      it(`[${label}] ${input}`, async () => {
        const {
          errorMessages,
          valid,
          completions,
          codeFragments,
          inputImage,
          input: newInput,
          parseImage
        } = parse({
          ctx: {
            formulaContext,
            interpretContext,
            meta: { namespaceId: testcaseNamespaceId, variableId: testVariableId, name: 'foo', input }
          }
        })

        expect(valid).toBe(true)
        expect({ codeFragments, firstCompletion: { ...completions[0], preview: undefined } }).toMatchSnapshot()
        expect({ inputImage, parseImage, newInput }).toEqual({
          inputImage: expectInputImage,
          parseImage: expectParseImage,
          newInput: expectNewInput
        })
        expect(errorMessages[0]?.message).toEqual(errorMessage)
        expect(completions[0].weight).toEqual(weight)
      })
    }
  )
})
