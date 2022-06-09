import { parse } from '../grammar/core'
import { makeContext } from '../tests/testHelper'
import { buildTestCases, GroupOption } from '../tests'

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
    const parseResult = parse(newCtx)
    expect(parseResult.completions.length).not.toBe(0)
    expect(parseResult.completions[0]).toMatchObject(args.option)
  })
})
