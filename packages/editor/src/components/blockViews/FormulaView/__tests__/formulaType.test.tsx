import { buildTestCases, makeContext } from '@mashcard/formula'
import { codeFragments2content } from '../../../../helpers'
import { render } from '@testing-library/react'
import { TestEditorContent } from '../../../../test/testEditor'
import { FormulaType } from '../../../../extensions/marks/formulaType'

const [testCases] = buildTestCases(['basic'])

describe('formulaType', () => {
  let ctx: Awaited<ReturnType<typeof makeContext>>
  beforeAll(async () => {
    jest.useRealTimers()
    ctx = await makeContext(testCases.options)
    jest.clearAllTimers()
  })

  it.each(testCases.basicTestCases)('$jestTitle', args => {
    const {
      variableParseResult: { codeFragments }
    } = ctx.parseDirectly(args)

    const content = codeFragments2content(codeFragments, args.richType?.type !== 'spreadsheet')[0]
    const { container } = render(<TestEditorContent content={content} extensions={[FormulaType]} />)
    expect(container).toMatchSnapshot()
  })
})
