import { interpret, parse } from '../grammar/core'
import { makeContext } from '../tests/testHelper'
import { buildTestCases } from '../tests'

const [finalTestCases] = buildTestCases(['async'])

describe('async', () => {
  let ctx: Awaited<ReturnType<typeof makeContext>>
  beforeAll(async () => {
    jest.useRealTimers()
    ctx = await makeContext(finalTestCases.options)
    jest.clearAllTimers()
  })

  it.each(finalTestCases.successTestCases)('$jestTitle', async args => {
    jest.useRealTimers()

    const newCtx = { ...ctx, meta: ctx.buildMeta(args) }
    const parseResult = parse(newCtx)
    expect(parseResult.variableParseResult.valid).toBe(true)
    expect(parseResult.errorMessages).toEqual([])
    expect(parseResult.success).toBe(true)

    const tempT = await interpret({ ctx: newCtx, parseResult })
    expect(tempT.task.async).toBe(parseResult.variableParseResult.async)

    const value = await tempT.task.variableValue
    expect(value.result.result).toEqual(args.result)

    jest.clearAllTimers()
  })
})
