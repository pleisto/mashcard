import { makeContext, buildTestCases, trackTodo } from '../tests'

const [testCases] = buildTestCases()
describe('errorParse', () => {
  let ctx: Awaited<ReturnType<typeof makeContext>>
  beforeAll(async () => {
    jest.useRealTimers()
    ctx = await makeContext(testCases.options)
    jest.clearAllTimers()
  })

  trackTodo(it, testCases.errorTestCases)

  it.each(testCases.errorTestCases)('$jestTitle', async args => {
    const parseResult = ctx.parseDirectly(args)
    expect(parseResult.success).toBe(false)
    expect([parseResult.errorMessages[0], parseResult.variableParseResult.valid]).toStrictEqual([
      { type: args.errorType, message: args.errorMessage },
      args.valid ?? true
    ])

    if (args.expressionType) {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(parseResult.expressionType).toStrictEqual(args.expressionType)
    }

    for (const { key, match, matchType } of args.expected ?? []) {
      const matchData = [key, parseResult.variableParseResult[key]]

      switch (matchType) {
        case undefined:
        case 'toStrictEqual':
          // eslint-disable-next-line jest/no-conditional-expect
          expect(matchData).toStrictEqual([key, match])
          break
        case 'toMatchObject':
          // eslint-disable-next-line jest/no-conditional-expect
          expect(matchData).toMatchObject([key, match])
          break
        case 'toMatchSnapshot':
          // eslint-disable-next-line jest/no-conditional-expect
          expect(matchData).toMatchSnapshot()
          break
      }
    }
  })
})
