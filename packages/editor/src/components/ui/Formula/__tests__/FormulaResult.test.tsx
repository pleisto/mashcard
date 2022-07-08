import { buildTestCases, makeContext } from '@mashcard/formula'
import { render } from '@testing-library/react'
import { FormulaResult } from '../FormulaResult'

const [testCases] = buildTestCases(['basic'])

describe('FormulaResult', () => {
  let ctx: Awaited<ReturnType<typeof makeContext>>
  beforeAll(async () => {
    jest.useRealTimers()
    ctx = await makeContext(testCases.options)
    jest.clearAllTimers()
  })

  it.each(testCases.basicTestCases)('$jestTitle', async args => {
    const tempT = await ctx.interpretDirectly(args)
    const { container } = render(<FormulaResult pageId="pageId" variableT={tempT} />)
    expect(container).toMatchSnapshot()
  })

  it('renders nothing if no variableT', () => {
    const { container } = render(<FormulaResult pageId="pageId" variableT={undefined} />)
    expect(container).toMatchSnapshot()
  })
})
