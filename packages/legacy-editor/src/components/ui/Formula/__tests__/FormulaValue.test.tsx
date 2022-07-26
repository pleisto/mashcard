import { render } from '@testing-library/react'
import { buildTestCases, dumpDisplayResultForDisplay, makeContext } from '@mashcard/formula'
import { FormulaValue } from '../FormulaValue'
import { mockEditor } from '../../../../test'
import { Formula } from '../../../../extensions'
import * as editorHooks from '../../../../hooks/useEditorContext'

const [input] = buildTestCases(['basic'])

jest.mock('../../../../hooks/useEditorContext', () => {
  const { useEditorContext } = jest.requireActual('../../../../hooks/useEditorContext')
  return { useEditorContext: jest.fn().mockImplementation(useEditorContext) }
})

describe('FormulaValue', () => {
  let ctx: Awaited<ReturnType<typeof makeContext>>
  beforeAll(async () => {
    jest.useRealTimers()
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
    const { container: container1 } = render(<FormulaValue border={false} displayData={displayData} />)
    expect(container1).toMatchSnapshot()

    const { container: container2 } = render(<FormulaValue border={true} displayData={displayData} />)
    expect(container2).toMatchSnapshot()
  })
})
