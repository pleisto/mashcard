import { buildVariableAsync, interpret, parse } from '../core'
import { FormulaContext } from '../../context'
import { VariableMetadata, VariableValue } from '../../types'
import { quickInsert } from '../testHelper'

const namespaceId = '57622108-1337-4edd-833a-2557835bcfe0'
const variableId = '481b6dd1-e668-4477-9e47-cfe5cb1239d0'

const formulaContext = new FormulaContext({})

const meta: VariableMetadata = { namespaceId, variableId, name: 'foo', input: '=24', position: 0, type: 'normal' }

const testCases = [
  { input: '=SLEEP(123)', output: 123 },
  { input: '=SLEEP(123+1)', output: 124 },
  { input: '=1+SLEEP(123)', output: NaN, todo: true },
  { input: '=SLEEP(123)+1', output: NaN, todo: true }
]

const ctx = {
  formulaContext,
  meta,
  interpretContext: { ctx: {}, arguments: [] }
}

describe('async', () => {
  beforeAll(async () => {
    await quickInsert({ ctx })
  })

  it.each(testCases)('async "$input"', async ({ input, output }) => {
    jest.useRealTimers()

    const newMeta = { ...meta, input, name: 'bar' }
    const parseResult = parse({ ctx: { ...ctx, meta: newMeta } })
    expect(parseResult.async).toBe(true)
    expect(parseResult.valid).toBe(true)
    expect(parseResult.success).toBe(true)

    const interpretResult = interpret({ parseResult, ctx })

    const newVariable = buildVariableAsync({
      variable: undefined,
      formulaContext,
      meta: newMeta,
      parseResult,
      interpretResult
    })
    expect(newVariable.t.async).toBe(true)

    await (newVariable.t.variableValue as Promise<VariableValue>).then(result => {
      expect(result.result.result).toEqual(output)
    })

    jest.clearAllTimers()
  })
})
