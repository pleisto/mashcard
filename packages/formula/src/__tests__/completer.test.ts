import { parse } from '../grammar/core'
import { makeContext, splitDefinition$ } from '../tests/testHelper'
import { buildTestCases, trackTodo } from '../tests'
import { getLastCodeFragment, applyCompletion } from '../grammar'
import { CompleteNames } from '../tests/feature/complete'

const [testCases] = buildTestCases(CompleteNames)

describe('completer', () => {
  let ctx: Awaited<ReturnType<typeof makeContext>>
  beforeAll(async () => {
    ctx = await makeContext(testCases.options)
  })

  trackTodo(it, testCases.completeTestCases)

  it.each(testCases.completeTestCases)('$jestTitle', async args => {
    const [definitionAfterSplit, positionAfterSplit] = splitDefinition$(args.definition$)

    const newCtx = {
      ...ctx,
      meta: ctx.buildMeta({ ...args, definition: definitionAfterSplit, position: positionAfterSplit })
    }
    const {
      completions,
      variableParseResult: { definition, position, codeFragments }
    } = parse(newCtx)
    const firstCompletion = completions[0]
    const [firstNonSpaceCodeFragment, secondNonSpaceCodeFragment, thirdNonSpaceCodeFragment] = getLastCodeFragment(
      codeFragments,
      position
    )

    // console.log('completionTest', completions.slice(0, 4), {
    //   firstCompletion,
    //   replacements: firstCompletion.replacements,
    //   args,
    //   firstNonSpaceCodeFragment
    // })

    expect({
      firstCompletion,
      firstNonSpaceCodeFragment,
      secondNonSpaceCodeFragment,
      thirdNonSpaceCodeFragment
    }).toMatchObject({
      firstCompletion: args.firstCompletion,
      firstNonSpaceCodeFragment: args.firstNonSpaceCodeFragment ?? {},
      secondNonSpaceCodeFragment: args.secondNonSpaceCodeFragment ?? {},
      thirdNonSpaceCodeFragment: args.thirdNonSpaceCodeFragment ?? {}
    })

    for (const complete of args.completes) {
      const completion = complete.match ? completions.find(c => c.name === complete.match)! : firstCompletion
      expect(complete).not.toBe(undefined)
      const result = applyCompletion({ ...newCtx, meta: ctx.buildMeta({ ...args, definition, position }) }, completion)

      const [newDefinition, newPosition] = splitDefinition$(complete.definition$)
      expect([complete, result]).toStrictEqual([complete, { definition: newDefinition, position: newPosition }])
    }
  })
})
