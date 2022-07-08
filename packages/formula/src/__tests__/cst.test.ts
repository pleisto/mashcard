import { makeContext } from '../tests/testHelper'
import { buildTestCases } from '../tests'

const [testCases] = buildTestCases(['cst'])

describe('cst', () => {
  let ctx: Awaited<ReturnType<typeof makeContext>>
  beforeAll(async () => {
    ctx = await makeContext(testCases.options)
  })

  it.each([...testCases.successTestCases, ...testCases.errorTestCases])('$jestTitle', async args => {
    const {
      variableParseResult: { cst }
    } = ctx.parseDirectly(args)
    expect(cst).toMatchSnapshot()
  })
})
