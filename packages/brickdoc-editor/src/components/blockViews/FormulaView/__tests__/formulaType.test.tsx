import { makeContext, parse } from '@brickdoc/formula'
import { codeFragments2content } from '../../../../helpers'

import { render } from '@testing-library/react'
import { TestEditorContent } from '../../../../test/testEditor'
import { FormulaType } from '../../../../extensions/marks/formulaType'

const simpleCommonTestCases = [
  '123',
  ' 1 + 1  +  1 ',
  '123asdasd',
  'a123 1',
  `#CurrentBlock`,
  `#CurrentBlock.foo_bar`,
  'foo_bar',
  ' " " & foo_bar ',
  'a+foo_bar',
  'custom::ADD(1)'
]

interface TestCase {
  input: string
  type: 'normal' | 'spreadsheet'
}

const simpleNormalTestCases: TestCase[] = ['', ...simpleCommonTestCases].map(c => ({ input: c, type: 'normal' }))

const simpleSpreadsheetTestCases: TestCase[] = [
  '',
  '=',
  ' foo baz ',
  '   ',
  ...simpleCommonTestCases.map(input => `=${input}`)
].map(c => ({ input: c, type: 'spreadsheet' }))

describe('formulaType', () => {
  let ctx: Awaited<ReturnType<typeof makeContext>>
  beforeAll(async () => {
    jest.useRealTimers()
    ctx = await makeContext({
      pages: [
        {
          pageName: 'formulaType',
          variables: [{ definition: '=123123', variableName: 'foo_bar' }]
        }
      ]
    })
    jest.clearAllTimers()
  })
  it.each([...simpleNormalTestCases, ...simpleSpreadsheetTestCases])('"$type" - "$input"', async ({ type, input }) => {
    const newCtx = {
      ...ctx,
      meta: ctx.buildMeta({
        definition: input,
        ...(type === 'normal'
          ? {}
          : {
              richType: { type: 'spreadsheet', meta: { spreadsheetId: '', columnId: '', rowId: '' } }
            })
      })
    }
    const {
      variableParseResult: { codeFragments }
    } = parse(newCtx)

    const content = codeFragments2content(codeFragments, type === 'normal')[0]

    const { container } = render(<TestEditorContent content={content} extensions={[FormulaType]} />)
    expect(container).toMatchSnapshot()
  })
})
