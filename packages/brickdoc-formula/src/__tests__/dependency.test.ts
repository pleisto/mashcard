import { makeContext } from '../tests/testHelper'
import { buildTestCases, trackTodo } from '../tests'
import { VariableValue } from '../types'
import { uuid } from '@brickdoc/active-support'

const [testCases] = buildTestCases('dependency')

describe('dependency', () => {
  let ctx: Awaited<ReturnType<typeof makeContext>>
  beforeEach(async () => {
    ctx = await makeContext({ ...testCases.options, uuidFunction: index => uuid() })
  })

  trackTodo(it, testCases.dependencyTestCases)

  it.each(testCases.dependencyTestCases)('$jestTitle', async args => {
    const v = ctx.formulaContext.findVariableByName(ctx.fetchUUID(args.namespaceId), args.name)!
    expect(v).not.toBeUndefined()

    for (const { formula, result, expected, action } of args.testCases) {
      if (action === 'updateDefinition') {
        await v.updateDefinition(formula)
      } else if (action === 'removeVariable') {
        await ctx.formulaContext.removeVariable(v.t.meta.namespaceId, v.t.meta.variableId)
      }

      expect([formula, (v.t.task.variableValue as VariableValue).result.result]).toStrictEqual([formula, result])

      for (const { namespaceId, name, match, matchType } of expected) {
        const v2 = ctx.formulaContext.findVariableByName(ctx.fetchUUID(namespaceId), name)!
        expect(v2).not.toBeUndefined()

        const matchData = [formula, { namespaceId, name }, (v2.t.task.variableValue as VariableValue).result.result]

        switch (matchType) {
          case undefined:
          case 'toStrictEqual':
            // eslint-disable-next-line jest/no-conditional-expect
            expect(matchData).toStrictEqual([formula, { namespaceId, name }, match])
            break
          case 'toMatchObject':
            // eslint-disable-next-line jest/no-conditional-expect
            expect(matchData).toMatchObject([formula, { namespaceId, name }, match])
            break
          case 'toMatchSnapshot':
            // eslint-disable-next-line jest/no-conditional-expect
            expect(matchData).toMatchSnapshot()
            break
        }
      }
    }
  })
})
