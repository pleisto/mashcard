import { makeContext } from '../tests/testHelper'
import { buildTestCases } from '../tests'

const [input] = buildTestCases(['async'])

describe('async', () => {
  let ctx: Awaited<ReturnType<typeof makeContext>>
  beforeAll(async () => {
    jest.useRealTimers()
    ctx = await makeContext(input.options)
  })

  it.each(input.successTestCases)('$jestTitle', async args => {
    jest.useRealTimers()

    const [tempT, parseResult] = await ctx.interpretDirectly(args)

    expect(parseResult.variableParseResult.valid).toBe(true)
    expect(parseResult.errorMessages).toEqual([])
    expect(parseResult.success).toBe(true)
    expect(tempT.task.async).toBe(parseResult.variableParseResult.async)

    const value = await tempT.task.variableValue
    expect(value.result.result).toEqual(args.result)
  })
})
