import { parse } from '../grammar/core'
import { makeContext } from '../tests/testHelper'
import { buildTestCases, trackTodo } from '../tests'
import { getLastCodeFragment, applyCompletion } from '../grammar'

const [testCases] = buildTestCases(['functionComplete', 'variableComplete', 'blockComplete', 'spreadsheetComplete'])

const splitDefinitionWithCursor = (
  definitionWithCursor: string
): { definitionAfterSplit: string; positionAfterSplit: number } => {
  const splits = definitionWithCursor.split('$')
  if (splits.length !== 2) throw new Error(`definitionWithCursor error ${definitionWithCursor}`)

  return {
    definitionAfterSplit: `${splits[0]}${splits[1]}`,
    positionAfterSplit: splits[0].length
  }
}

describe('completer', () => {
  let ctx: Awaited<ReturnType<typeof makeContext>>
  beforeAll(async () => {
    ctx = await makeContext(testCases.options)
  })

  trackTodo(it, testCases.completeTestCases)

  it.each([...testCases.completeTestCases])('$jestTitle', async args => {
    const { definitionAfterSplit, positionAfterSplit } = splitDefinitionWithCursor(args.definitionWithCursor)

    const newCtx = {
      ...ctx,
      meta: ctx.buildMeta({ ...args, definition: definitionAfterSplit, position: positionAfterSplit })
    }
    const {
      completions,
      variableParseResult: { definition, position, codeFragments }
    } = parse(newCtx)
    expect(completions.length).not.toBe(0)
    const firstCompletion = completions[0]
    const [firstNonSpaceCodeFragment, secondNonSpaceCodeFragment] = getLastCodeFragment(codeFragments, position)

    // console.log('completionTest', completions.slice(0, 4), {
    //   firstCompletion,
    //   replacements: firstCompletion.replacements,
    //   args,
    //   firstNonSpaceCodeFragment
    // })

    expect({ firstCompletion, firstNonSpaceCodeFragment, secondNonSpaceCodeFragment }).toMatchObject({
      firstCompletion: args.firstCompletion,
      firstNonSpaceCodeFragment: args.firstNonSpaceCodeFragment ?? {},
      secondNonSpaceCodeFragment: args.secondNonSpaceCodeFragment ?? {}
    })

    for (const complete of args.completes) {
      const completion = complete.match ? completions.find(c => c.name === complete.match)! : firstCompletion
      expect(complete).not.toBe(undefined)
      const completeResult = applyCompletion(
        { ...newCtx, meta: ctx.buildMeta({ ...args, definition, position }) },
        completion
      )

      const { definitionAfterSplit, positionAfterSplit } = splitDefinitionWithCursor(complete.definitionWithCursor)
      expect([complete, completeResult]).toStrictEqual([
        complete,
        { definition: definitionAfterSplit, position: positionAfterSplit }
      ])
    }
  })
})
