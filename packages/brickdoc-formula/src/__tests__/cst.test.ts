import { parse } from '../grammar/core'
import { makeContext } from '../tests/testHelper'
import { buildTestCases } from '../tests'

const testCases = buildTestCases('cst')

describe('cst', () => {
  let ctx: Awaited<ReturnType<typeof makeContext>>
  beforeAll(async () => {
    jest.useRealTimers()
    ctx = await makeContext(testCases.options)
    jest.clearAllTimers()
  })

  it.each([...testCases.successTestCases, ...testCases.errorTestCases])('$jestTitle', async args => {
    jest.useRealTimers()

    const newCtx = { ...ctx, meta: ctx.buildMeta(args) }
    const {
      variableParseResult: { cst }
    } = parse(newCtx)
    expect(cst).toMatchSnapshot()

    jest.clearAllTimers()
  })
})
