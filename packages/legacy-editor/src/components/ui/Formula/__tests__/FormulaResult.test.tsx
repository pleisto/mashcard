import { BasicNames, buildTestCases, makeContext, TestCaseInput } from '@mashcard/formula'
import { render } from '@testing-library/react'
import { Formula } from '../../../../extensions'
import { mockEditor } from '../../../../test'
import { FormulaResult } from '../FormulaResult'
import * as editorHooks from '../../../../hooks/useEditorContext'

const [input, testCases] = buildTestCases<TestCaseInput['basicTestCases'][0]>(BasicNames)

jest.mock('react-i18next', () => ({
  // this mock makes sure any components using the translate hook can use it without a warning being shown
  useTranslation: () => {
    return {
      t: (str: string, context: Record<string, string> | undefined) => {
        if (!context) return str

        return `${str} ${JSON.stringify(context)}`
      }
    }
  }
}))

jest.mock('../../../../hooks/useEditorContext', () => {
  const { useEditorContext } = jest.requireActual('../../../../hooks/useEditorContext')
  return { useEditorContext: jest.fn().mockImplementation(useEditorContext) }
})

describe('FormulaResult', () => {
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

  it.each(testCases)('$jestTitle', async args => {
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
