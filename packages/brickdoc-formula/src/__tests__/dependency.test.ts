import { makeContext } from '../tests/testHelper'
import { buildTestCases, trackTodo } from '../tests'
import { VariableValue } from '../types'

const [testCases] = buildTestCases('dependency')

describe('dependency', () => {
  let ctx: Awaited<ReturnType<typeof makeContext>>
  beforeEach(async () => {
    jest.useRealTimers()
    ctx = await makeContext(testCases.options)
    jest.clearAllTimers()
  })

  trackTodo(it, testCases.dependencyTestCases)

  it.each(testCases.dependencyTestCases)('$jestTitle', async args => {
    jest.useRealTimers()

    const v = ctx.formulaContext.findVariableByName(args.namespaceId, args.name)!
    expect(v).not.toBeUndefined()

    for (const { definition, result, expected } of args.testCases) {
      await v.updateDefinition(definition)
      await new Promise(resolve => setTimeout(resolve, 50))

      expect([definition, (v.t.task.variableValue as VariableValue).result.result]).toStrictEqual([definition, result])

      for (const { namespaceId, name, match, matchType } of expected) {
        const v2 = ctx.formulaContext.findVariableByName(namespaceId, name)!
        expect(v2).not.toBeUndefined()

        const matchData = [name, definition, namespaceId, (v2.t.task.variableValue as VariableValue).result.result]

        switch (matchType) {
          case undefined:
          case 'toStrictEqual':
            // eslint-disable-next-line jest/no-conditional-expect
            expect(matchData).toStrictEqual([name, definition, namespaceId, match])
            break
          case 'toMatchObject':
            // eslint-disable-next-line jest/no-conditional-expect
            expect(matchData).toMatchObject([name, definition, namespaceId, match])
            break
          case 'toMatchSnapshot':
            // eslint-disable-next-line jest/no-conditional-expect
            expect(matchData).toMatchSnapshot()
            break
        }
      }
    }

    jest.clearAllTimers()
  })
})
