import { buildTestCases, dumpDisplayResultForDisplay, makeContext } from '@mashcard/formula'
import { render } from '@testing-library/react'
import { FormulaDisplay } from '..'

const [testCases] = buildTestCases(['basic'])

describe('FormulaDisplay', () => {
  let ctx: Awaited<ReturnType<typeof makeContext>>
  beforeAll(async () => {
    jest.useRealTimers()
    ctx = await makeContext(testCases.options)
    jest.clearAllTimers()
  })

  it.each(testCases.basicTestCases)('$jestTitle', async args => {
    const [tempT] = await ctx.interpretDirectly(args)
    const displayData = dumpDisplayResultForDisplay([tempT])
    const { container } = render(<FormulaDisplay formulaType="normal" displayData={displayData} />)
    expect(container).toMatchSnapshot()
  })

  it('renders normal type empty correctly', () => {
    const { container } = render(<FormulaDisplay formulaType="normal" />)

    expect(container).toMatchSnapshot()
  })

  it('renders spreadsheet type empty correctly', () => {
    const { container } = render(<FormulaDisplay formulaType="spreadsheet" />)

    expect(container).toMatchSnapshot()
  })
})
