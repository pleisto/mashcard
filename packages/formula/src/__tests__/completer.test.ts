import { parse } from '../grammar/core'
import { makeContext, splitDefinition$ } from '../tests/testHelper'
import { buildTestCases, CompleteNames, trackTodo } from '../tests'
import { getLastCodeFragment, applyCompletion, attrs2completion } from '../grammar'

const [testCases] = buildTestCases(CompleteNames)

describe('completer', () => {
  let ctx: Awaited<ReturnType<typeof makeContext>>
  beforeAll(async () => {
    ctx = await makeContext(testCases.options)
  })

  trackTodo(it, [...testCases.completeTestCases, ...testCases.attrsCompleteTestCases])

  it.each(testCases.attrsCompleteTestCases)('$jestTitle', async args => {
    const {
      variableParseResult: { codeFragments },
      meta: { namespaceId }
    } = ctx.parseDirectly(args)

    for (const { code, match, matchType } of args.expected) {
      const codeFragment = codeFragments.find(c => c.code === code)
      const completion = codeFragment?.attrs
        ? attrs2completion(ctx.formulaContext, codeFragment.attrs, namespaceId)
        : undefined

      const matchData = [code, [codeFragment?.attrs, completion]]

      switch (matchType) {
        case undefined:
        case 'toStrictEqual':
          // eslint-disable-next-line jest/no-conditional-expect
          expect(matchData).toStrictEqual([code, match])
          break
        case 'toMatchObject':
          // eslint-disable-next-line jest/no-conditional-expect
          expect(matchData).toMatchObject([code, match])
          break
        case 'toMatchSnapshot':
          // eslint-disable-next-line jest/no-conditional-expect
          expect(matchData).toMatchSnapshot()
          break
      }
    }
  })

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
