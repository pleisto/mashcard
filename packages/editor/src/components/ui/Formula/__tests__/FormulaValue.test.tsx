import { render } from '@testing-library/react'
import { buildTestCases, dumpDisplayResultForDisplay, makeContext } from '@mashcard/formula'
import { FormulaValue } from '../FormulaValue'

const [testCases] = buildTestCases(['basic'])

describe('FormulaValue', () => {
  let ctx: Awaited<ReturnType<typeof makeContext>>
  beforeAll(async () => {
    jest.useRealTimers()
    ctx = await makeContext(testCases.options)
    jest.clearAllTimers()
  })

  it.each(testCases.basicTestCases)('$jestTitle', async args => {
    const tempT = await ctx.interpretDirectly(args)
    const displayData = dumpDisplayResultForDisplay(tempT)
    const { container: container1 } = render(<FormulaValue border={false} displayData={displayData} />)
    expect(container1).toMatchSnapshot()

    const { container: container2 } = render(<FormulaValue border={true} displayData={displayData} />)
    expect(container2).toMatchSnapshot()
  })
})
