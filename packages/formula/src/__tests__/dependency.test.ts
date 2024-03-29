/* eslint-disable jest/no-conditional-expect */
import { makeContext } from '../tests/testHelper'
import { buildTestCases, TestCaseInput, trackTodo } from '../tests'
import { VariableInterface, VariableValue } from '../type'
import { uuid } from '@mashcard/active-support'
import { BlockType } from '../controls'
import { DependencyNames } from '../tests/feature/dependency'
import { matchObject } from '../tests/testMock'
import { MashcardEventBus } from '@mashcard/schema'

const [input, testCases] = buildTestCases<TestCaseInput['dependencyTestCases'][0]>(DependencyNames)

describe('dependency', () => {
  let ctx: Awaited<ReturnType<typeof makeContext>>
  beforeEach(async () => {
    MashcardEventBus.reset()
    ctx = await makeContext({ ...input.options, uuidFunction: index => uuid() })
  })

  trackTodo(it, testCases)

  it.each(testCases)('$jestTitle', async args => {
    let v: VariableInterface, b: BlockType

    if (args.type === 'Variable') {
      v = ctx.formulaContext.findVariableByName(ctx.fetchUUID(args.namespaceId), args.name)!
      expect(v).not.toBeUndefined()
    } else if (args.type === 'Block') {
      b = ctx.formulaContext.findBlockById(ctx.fetchUUID(args.namespaceId))!
      expect(b).not.toBeUndefined()
    }

    for (const { expected, action } of args.testCases) {
      if (args.type === 'Variable') {
        switch (action.name) {
          case 'removeVariable':
            await ctx.formulaContext.removeVariable(v!.t.meta.namespaceId, v!.t.meta.variableId)
            break
          case 'updateDefinition':
            await v!.updateDefinition(action.formula)
            expect([action.formula, (v!.t.task.variableValue as VariableValue).result.result]).toStrictEqual([
              action.formula,
              action.result
            ])
            break
        }
      } else if (args.type === 'Block') {
        switch (action.name) {
          case 'removeBlock':
            await ctx.formulaContext.removeBlock(b!.id)
            break
        }
      }

      for (const { namespaceId, name, match, matchType, definition } of expected) {
        const v2 = ctx.formulaContext.findVariableByName(ctx.fetchUUID(namespaceId), name)!
        expect(v2).not.toBeUndefined()

        if (definition) {
          expect(v2.t.variableParseResult.definition).toStrictEqual(definition)
        }

        const matchData = [
          action,
          { namespaceId, name },
          matchObject((v2.t.task.variableValue as VariableValue).result)
        ]

        switch (matchType) {
          case undefined:
          case 'toStrictEqual':
            expect(matchData).toStrictEqual([action, { namespaceId, name }, match])
            break
          case 'toMatchObject':
            expect(matchData).toMatchObject([action, { namespaceId, name }, match])
            break
          case 'toMatchSnapshot':
            expect(matchData).toMatchSnapshot()
            break
        }
      }
    }
  })
})
