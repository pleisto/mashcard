import { BasicNames, buildTestCases, makeContext } from '@mashcard/formula'
import { render } from '@testing-library/react'
import { FormulaResult } from '../FormulaResult'

const [testCases] = buildTestCases(BasicNames)

describe('FormulaResult', () => {
  let ctx: Awaited<ReturnType<typeof makeContext>>
  beforeAll(async () => {
    jest.useRealTimers()
    ctx = await makeContext(testCases.options)
    jest.clearAllTimers()
  })

  it.each(testCases.basicTestCases)('$jestTitle', async args => {
    const [tempT, parseResult] = await ctx.interpretDirectly(args)
    const { container } = render(<FormulaResult meta={parseResult.meta} variableT={tempT} />)
    expect(container).toMatchSnapshot()
  })

  it('renders nothing if no variableT', () => {
    const meta = {
      namespaceId: '',
      variableId: '',
      name: '',
      input: '',
      position: 0,
      richType: { type: 'normal' }
    } as const
    const { container } = render(<FormulaResult meta={meta} variableT={undefined} />)
    expect(container).toMatchSnapshot()
  })
})
