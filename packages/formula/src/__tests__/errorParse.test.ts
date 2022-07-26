import { generateVariable } from '../grammar'
import { makeContext, trackTodo, ALL_TEST_CASE } from '../tests'

const testCases = ALL_TEST_CASE

describe('errorParse', () => {
  let ctx: Awaited<ReturnType<typeof makeContext>>
  beforeAll(async () => {
    ctx = await makeContext(testCases.options)
  })

  trackTodo(it, testCases.errorTestCases)

  it.each(testCases.errorTestCases)('$jestTitle', async args => {
    const [tempT, parseResult] = await ctx.interpretDirectly(args)
    expect([parseResult.success, parseResult.errorMessages[0], parseResult.variableParseResult.valid]).toStrictEqual([
      false,
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

    // Ensure value is not changed after save.
    const variable = generateVariable({ formulaContext: ctx.formulaContext, t: tempT })
    await variable.save()
    expect((await variable.t.task.variableValue).result).toStrictEqual({
      type: 'Error',
      result: {
        type: args.errorType,
        message: args.errorMessage
      }
    })
  })
})
