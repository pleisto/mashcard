import { makeContext } from '../tests/testHelper'
import { buildTestCases, TestCaseInput } from '../tests'

const [input, testCases] = buildTestCases<TestCaseInput['basicTestCases'][0]>(['cst'])

describe('cst', () => {
  let ctx: Awaited<ReturnType<typeof makeContext>>
  beforeAll(async () => {
    ctx = await makeContext(input.options)
  })

  it.each(testCases)('$jestTitle', async args => {
    const {
      variableParseResult: { cst }
    } = ctx.parseDirectly(args)
    expect(cst).toMatchSnapshot()
  })
})
