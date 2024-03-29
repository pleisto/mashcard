import { generateVariable } from '../grammar'
import { makeContext, trackTodo, ALL_TEST_CASE } from '../tests'
import { matchObject } from '../tests/testMock'

const testCases = ALL_TEST_CASE

describe('successExecute', () => {
  let ctx: Awaited<ReturnType<typeof makeContext>>
  beforeAll(async () => {
    ctx = await makeContext(testCases.options)
  })

  trackTodo(it, testCases.successTestCases)

  it.each(testCases.successTestCases)('$jestTitle', async args => {
    const [tempT, parseResult] = await ctx.interpretDirectly(args)
    expect([parseResult.variableParseResult.valid, parseResult.success, parseResult.errorMessages]).toStrictEqual([
      true,
      true,
      []
    ])

    if (args.expressionType) {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(parseResult.expressionType).toStrictEqual(args.expressionType)
    }

    const value = await tempT.task.variableValue
    expect(matchObject(value.result)).toStrictEqual(args.result)

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
    expect(await variable.t.task.variableValue).toStrictEqual(value)
  })
})
