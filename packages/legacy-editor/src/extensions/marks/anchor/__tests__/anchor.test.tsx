import { render, renderHook } from '@testing-library/react'
import { TestEditorContent, useTestEditor } from '../../../../test/testEditor'
import { Anchor } from '../anchor'

describe('Anchor', () => {
  it('renders Anchor correctly', () => {
    const content = `
    <p>
      <span data-anchor="true">anchor</span>
    </p>
    `
    const { container } = render(<TestEditorContent content={content} extensions={[Anchor]} />)

    expect(container).toMatchSnapshot()
  })

  it('triggers setAnchor correctly', () => {
    const { result } = renderHook(() =>
      useTestEditor({
        content: '<p>content</p>',
        extensions: [Anchor]
      })
    )

    const editor = result.current

    editor?.commands.setTextSelection({ from: 0, to: 1 })
    editor?.commands.setAnchor()

    expect(editor?.isActive(Anchor.name)).toBeTruthy()
  })

  it('triggers unsetAnchor correctly', () => {
    const { result } = renderHook(() =>
      useTestEditor({
        content: '<p>content</p>',
        extensions: [Anchor]
      })
    )

    const editor = result.current

    editor?.commands.setTextSelection({ from: 0, to: 1 })
    editor?.commands.setAnchor()
    editor?.commands.unsetAnchor()

    expect(editor?.isActive(Anchor.name)).toBeFalsy()
  })

  it('triggers toggleAnchor correctly', () => {
    const { result } = renderHook(() =>
      useTestEditor({
        content: '<p>content</p>',
        extensions: [Anchor]
      })
    )

    const editor = result.current

    editor?.commands.setTextSelection({ from: 0, to: 1 })

    editor?.commands.toggleAnchor()
    expect(editor?.isActive(Anchor.name)).toBeTruthy()

    editor?.commands.toggleAnchor()
    expect(editor?.isActive(Anchor.name)).toBeFalsy()
  })
})
