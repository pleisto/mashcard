import { parse } from '../grammar'
import { makeContext, buildTestCases } from '../tests'

describe('errorParse', () => {
  const testCases = buildTestCases()
  let ctx: Awaited<ReturnType<typeof makeContext>>
  beforeAll(async () => {
    jest.useRealTimers()
    ctx = await makeContext(testCases.options)
    jest.clearAllTimers()
  })

  it.each(testCases.errorTestCases)('$jestTitle', async args => {
    jest.useRealTimers()
    const newCtx = { ...ctx, meta: ctx.buildMeta(args) }
    const parseResult = parse(newCtx)
    expect(parseResult.success).toBe(false)
    expect([parseResult.errorMessages[0], parseResult.variableParseResult.valid]).toStrictEqual([
      { type: args.errorType, message: args.errorMessage },
      args.valid ?? true
    ])

    for (const { key, match, matchType } of args.expected ?? []) {
      switch (matchType) {
        case undefined:
        case 'toStrictEqual':
          // eslint-disable-next-line jest/no-conditional-expect
          expect([key, parseResult.variableParseResult[key]]).toStrictEqual([key, match])
          break
        case 'toMatchObject':
          // eslint-disable-next-line jest/no-conditional-expect
          expect([key, parseResult.variableParseResult[key]]).toMatchObject([key, match])
          break
        case 'toMatchSnapshot':
          // eslint-disable-next-line jest/no-conditional-expect
          expect([key, parseResult.variableParseResult[key]]).toMatchSnapshot()
          break
      }
    }
    jest.clearAllTimers()
  })
})
