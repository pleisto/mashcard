import { buildTestCases } from '../tests'
import { makeContext } from '../tests/testHelper'

const [testCases] = buildTestCases()

describe('parser', () => {
  let ctx: Awaited<ReturnType<typeof makeContext>>
  beforeAll(async () => {
    jest.useRealTimers()
    ctx = await makeContext(testCases.options)
    jest.clearAllTimers()
  })
  it.each(
    [...testCases.successTestCases, ...testCases.errorTestCases].map(t => ({
      ...t,
      position: Math.floor(Math.random() * t.definition.length)
    }))
  )('$jestTitle <$position>', args => {
    const {
      variableParseResult: { definition, codeFragments, position }
    } = ctx.parseDirectly(args)
    expect([codeFragments.map(c => c.display).join(''), definition, position]).toEqual([
      definition,
      args.newAbbrevInput ?? args.definition,
      args.position
    ])
  })
})
