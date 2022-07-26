import { buildTestCases, dumpDisplayResultForDisplay, makeContext } from '@mashcard/formula'
import { render } from '@testing-library/react'
import { FormulaDisplay } from '..'
import { Formula } from '../../../../extensions'
import { mockEditor } from '../../../../test'
import * as editorHooks from '../../../../hooks/useEditorContext'

const [input] = buildTestCases(['basic'])

jest.mock('../../../../hooks/useEditorContext', () => {
  const { useEditorContext } = jest.requireActual('../../../../hooks/useEditorContext')
  return { useEditorContext: jest.fn().mockImplementation(useEditorContext) }
})

describe('FormulaDisplay', () => {
  let ctx: Awaited<ReturnType<typeof makeContext>>
  beforeAll(async () => {
    ctx = await makeContext(input.options)

    const editor = mockEditor({
      extensionManager: {
        extensions: [{ name: Formula.name, options: { formulaContext: ctx.formulaContext } }]
      }
    })

    jest.spyOn(editorHooks, 'useEditorContext').mockImplementation(() => ({ editor, documentEditable: true }))
  })

  afterAll(() => {
    jest.restoreAllMocks()
  })

  it.each(input.basicTestCases)('$jestTitle', async args => {
    const [tempT] = await ctx.interpretDirectly(args)
    const displayData = dumpDisplayResultForDisplay(tempT)
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
