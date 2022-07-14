import { render, renderHook } from '@testing-library/react'
import { TestEditorContent, useTestEditor } from '../../../../test/testEditor'
import { FormulaType } from '../formulaType'

describe('FormulaType', () => {
  it('renders FormulaType correctly', () => {
    const content = `
    <p>
      <mark class="mashcard-formula-mark">formula</mark>
    </p>
    `
    const { container } = render(<TestEditorContent content={content} extensions={[FormulaType]} />)

    expect(container).toMatchSnapshot()
  })

  it('triggers replaceRoot correctly', () => {
    const { result } = renderHook(() =>
      useTestEditor({
        content: '<span>text</span>',
        extensions: [FormulaType]
      })
    )

    const editor = result.current

    expect(() => {
      editor?.commands.replaceRoot([])
    }).not.toThrow()
  })
})
