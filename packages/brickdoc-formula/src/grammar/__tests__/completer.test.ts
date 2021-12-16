import { complete, lexerByMode, parse, quickInsert } from '..'
import { CodeFragment } from '../..'
import { FormulaContext } from '../../context'

const formulaContext = new FormulaContext({})
const namespaceId = '57622108-1337-4edd-833a-2557835bcfe0'
const variableId = '481b6dd1-e668-4477-9e47-cfe5cb1239d0'
const barVariableId = '28e28190-63bd-4f70-aeca-26e72574c01a'
const test2VariableId = '99499117-5694-4d83-9ccd-85a3ab0b8f25'
const testNamespaceId = 'cd4f6e1e-765e-4064-badd-b5585c7eff8e'
const testVariableId = 'd986e871-cb85-4bd5-b675-87307f60b882'

// const testName1 = 'varvarabc中文var'
const testName1 = 'varvarabcvar'
// TODO Chinese name
const testName2 = '中文baz345'

const meta = { namespaceId, variableId, name: testName1, input: '=24' }
const barMeta = { namespaceId, variableId: barVariableId, name: 'bar', input: '=43' }
const test2Meta = { namespaceId, variableId: test2VariableId, name: testName2, input: '=80' }
describe('Complete', () => {
  beforeAll(async () => {
    await quickInsert({ formulaContext, meta })
    await quickInsert({ formulaContext, meta: barMeta })
    await quickInsert({ formulaContext, meta: test2Meta })
  })

  it('basic', () => {
    const input = '=123'
    const lexResult = lexerByMode('oneline').tokenize(input)
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

  it('var startWith', () => {
    const input = '=  1 + var'
    const { errorMessages, valid, completions, codeFragments, inputImage, parseImage } = parse({
      formulaContext,
      meta: { namespaceId, variableId: testVariableId, name: 'foo', input }
    })
    expect(inputImage).toEqual('=1+var')
    expect(parseImage).toEqual('=1+')
    expect(errorMessages[0]!.message).toEqual('TODO mismatch token FunctionCall')
    expect(codeFragments).toMatchSnapshot()
    expect(valid).toBe(true)
    expect(completions[0].weight).toEqual(101)
  })

  it('var equal different namespaceId', () => {
    const input = `=${testName1}`
    const { errorMessages, valid, completions, codeFragments, inputImage, parseImage } = parse({
      formulaContext,
      meta: { namespaceId: testNamespaceId, variableId: testVariableId, name: 'foo', input }
    })

    expect(inputImage).toEqual(`=${testName1}`)
    expect(parseImage).toEqual('=')
    expect(errorMessages[0]!.message).toEqual('TODO mismatch token FunctionCall')
    expect(valid).toBe(true)
    expect(codeFragments).toMatchSnapshot()
    expect(completions[0].weight).toEqual(999)
  })

  it('var equal', () => {
    const input = `=${testName1}`
    const { errorMessages, valid, completions, codeFragments, inputImage, parseImage } = parse({
      formulaContext,
      meta: { namespaceId, variableId: testVariableId, name: 'foo', input }
    })

    expect(inputImage).toEqual(`=${testName1}`)
    expect(parseImage).toEqual('=')
    expect(errorMessages[0]!.message).toEqual('TODO mismatch token FunctionCall')
    expect(valid).toBe(true)
    expect(codeFragments).toMatchSnapshot()
    expect(completions[0].weight).toEqual(1001)
  })

  it('var include', () => {
    const input = '=1+arvar'
    const { errorMessages, valid, completions, inputImage, parseImage } = parse({
      formulaContext,
      meta: { namespaceId, variableId: testVariableId, name: 'foo', input }
    })

    expect(inputImage).toEqual('=1+arvar')
    expect(parseImage).toEqual('=1+')
    expect(errorMessages[0]!.message).toEqual('TODO mismatch token FunctionCall')
    expect(valid).toBe(true)
    expect(completions[0].weight).toEqual(11)
  })

  it('space + same namespace', () => {
    const input = `= 1 + ${testName1} `
    const {
      errorMessages,
      valid,
      completions,
      codeFragments,
      inputImage,
      parseImage,
      input: newInput
    } = parse({
      formulaContext,
      activeCompletion: formulaContext.completions(namespaceId, testVariableId).find(c => c.name === testName1)!,
      meta: { namespaceId, variableId: testVariableId, name: 'foo', input }
    })

    expect(inputImage).toEqual(`=1+$${namespaceId}@${variableId}`)
    expect(parseImage).toEqual(`=1+$${namespaceId}@${variableId}`)
    expect(newInput).toEqual(`= 1 + $${namespaceId}@${variableId} `)
    expect(errorMessages).toEqual([])
    expect(valid).toBe(true)
    expect(codeFragments).toMatchSnapshot()
    expect(completions[0].name).toEqual(testName1)
  })

  it('space + different namespace', () => {
    const input = `= 1 + ${testName1} `
    const {
      errorMessages,
      valid,
      completions,
      codeFragments,
      inputImage,
      parseImage,
      input: newInput
    } = parse({
      formulaContext,
      activeCompletion: formulaContext.completions(namespaceId, testVariableId).find(c => c.name === testName1)!,
      meta: { namespaceId: testNamespaceId, variableId: testVariableId, name: 'foo', input }
    })

    expect(inputImage).toEqual(`=1+$${namespaceId}@${variableId}`)
    expect(parseImage).toEqual(`=1+$${namespaceId}@${variableId}`)
    expect(newInput).toEqual(`= 1 + $${namespaceId}@${variableId} `)
    expect(errorMessages).toEqual([])
    expect(valid).toBe(true)
    expect(codeFragments).toMatchSnapshot()
    expect(completions[0].name).not.toEqual('bar')
    expect(completions[0].kind).toEqual('function')
  })

  it('dot + same namespace', () => {
    const input = `= 1 + ${testName1}.`
    const {
      errorMessages,
      valid,
      completions,
      codeFragments,
      inputImage,
      parseImage,
      input: newInput
    } = parse({
      formulaContext,
      activeCompletion: formulaContext.completions(namespaceId, testVariableId).find(c => c.name === testName1)!,
      meta: { namespaceId, variableId: testVariableId, name: 'foo', input }
    })

    expect({ inputImage, parseImage, newInput }).toEqual({
      inputImage: `=1+$${namespaceId}@${variableId}.`,
      parseImage: `=1+$${namespaceId}@${variableId}.`,
      newInput: `= 1 + $${namespaceId}@${variableId}.`
    })

    expect(errorMessages[0]!.message).toEqual('TODO mismatch token FunctionCall')
    expect(valid).toBe(true)
    expect(codeFragments).toMatchSnapshot()
    expect(completions[0].kind).toEqual('function')
    expect((completions[0].preview as any).chain).toEqual(true)
  })

  it('dot + different namespace', () => {
    const input = `= 1 + ${testName1}.`
    const {
      errorMessages,
      valid,
      completions,
      codeFragments,
      inputImage,
      parseImage,
      input: newInput
    } = parse({
      formulaContext,
      activeCompletion: formulaContext.completions(namespaceId, testVariableId).find(c => c.name === testName1)!,
      meta: { namespaceId: testNamespaceId, variableId: testVariableId, name: 'foo', input }
    })

    expect(inputImage).toEqual(`=1+$${namespaceId}@${variableId}.`)
    expect(parseImage).toEqual(`=1+$${namespaceId}@${variableId}.`)
    expect(newInput).toEqual(`= 1 + $${namespaceId}@${variableId}.`)
    expect(errorMessages[0]!.message).toEqual('TODO mismatch token FunctionCall')
    expect(valid).toBe(true)
    expect(codeFragments).toMatchSnapshot()
    expect(completions[0].kind).toEqual('function')
    expect((completions[0].preview as any).chain).toEqual(true)
  })
})
