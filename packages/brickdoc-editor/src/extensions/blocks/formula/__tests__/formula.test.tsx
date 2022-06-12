import { render } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'
import { TestEditorContent, useTestEditor } from '../../../../test/testEditor'
import { Formula } from '../formula'

describe('Formula', () => {
  it('renders Formula correctly', () => {
    const content = `
    <formula-block></formula-block>
    `
    const { container } = render(<TestEditorContent content={content} extensions={[Formula]} />)

    expect(container).toMatchSnapshot()
  })

  it('triggers setFormula correctly', () => {
    const { result } = renderHook(() =>
      useTestEditor({
        extensions: [Formula]
      })
    )

    const editor = result.current
    const position = 0

    editor?.commands.setFormula('id')

    // formula is an inline block which wrapped in paragraph
    expect(editor?.state.doc.nodeAt(position)?.firstChild?.type.name).toBe(Formula.name)
  })

  it('triggers setFormulaBlock correctly', () => {
    const { result } = renderHook(() =>
      useTestEditor({
        extensions: [Formula]
      })
    )

    const editor = result.current
    const position = 0

    editor?.commands.setFormulaBlock()

    // formula is an inline block which wrapped in paragraph
    expect(editor?.state.doc.nodeAt(position)?.firstChild?.type.name).toBe(Formula.name)
  })

  it('triggers insertFormulaBlock correctly', () => {
    const { result } = renderHook(() =>
      useTestEditor({
        extensions: [Formula]
      })
    )

    const editor = result.current
    const position = 0

    editor?.commands.insertFormulaBlock(position)

    // formula is an inline block which wrapped in paragraph
    expect(editor?.state.doc.nodeAt(position)?.firstChild?.type.name).toBe(Formula.name)
  })

  it('triggers toggleFormula correctly', () => {
    const { result } = renderHook(() =>
      useTestEditor({
        content: '<p>content</p>',
        extensions: [Formula]
      })
    )

    const editor = result.current
    const position = 0

    editor?.commands.toggleFormula()
    // formula is an inline block which wrapped in paragraph
    expect(editor?.state.doc.nodeAt(position)?.firstChild?.type.name).toBe(Formula.name)
  })
})
