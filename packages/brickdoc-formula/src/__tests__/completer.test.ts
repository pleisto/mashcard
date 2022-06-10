import { parse } from '../grammar/core'
import { makeContext } from '../tests/testHelper'
import { buildTestCases, GroupOption } from '../tests'
import { handleComplete } from '../grammar'

const groupName = 'complete' as const
const [testCases] = buildTestCases(groupName)

describe('completer', () => {
  let ctx: Awaited<ReturnType<typeof makeContext>>
  beforeAll(async () => {
    ctx = await makeContext(testCases.options)
  })

  it.each(
    [...testCases.successTestCases, ...testCases.errorTestCases].map(t => ({
      ...t,
      option: t.groupOptions.find(g => g.name === groupName)!.options as Extract<
        GroupOption,
        { name: typeof groupName }
      >['options']
    }))
  )('$jestTitle => $option', async args => {
    const newCtx = { ...ctx, meta: ctx.buildMeta(args) }
    const {
      completions,
      variableParseResult: { definition, position }
    } = parse(newCtx)
    expect(completions.length).not.toBe(0)
    const firstCompletion = completions[0]
    expect(firstCompletion).toMatchObject(args.option.completion)
    expect(handleComplete(firstCompletion, { definition, position })).toStrictEqual(args.option.result)
  })
})
