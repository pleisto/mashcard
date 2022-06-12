import { render } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'
import { TestEditorContent, useTestEditor } from '../../../../test/testEditor'
import { Discussion } from '../discussion'

describe('Discussion', () => {
  it('renders Discussion correctly', () => {
    const content = `
    <p>
      <mark class="brickdoc-discussion-mark">discussion</mark>
    </p>
    `
    const { container } = render(<TestEditorContent content={content} extensions={[Discussion]} />)

    expect(container).toMatchSnapshot()
  })

  it('triggers setDiscussion correctly', () => {
    const { result } = renderHook(() =>
      useTestEditor({
        content: '<p>content</p>',
        extensions: [Discussion]
      })
    )

    const editor = result.current

    editor?.commands.setTextSelection({ from: 0, to: 1 })
    editor?.commands.setDiscussion()

    expect(editor?.isActive(Discussion.name)).toBeTruthy()
  })

  it('triggers removeDiscussion correctly', () => {
    const { result } = renderHook(() =>
      useTestEditor({
        content: '<p><mark mark-id="id" class="brickdoc-discussion-mark">content</mark></p>',
        extensions: [Discussion]
      })
    )

    const editor = result.current

    editor?.commands.setTextSelection({ from: 0, to: 7 })
    expect(editor?.isActive(Discussion.name)).toBeTruthy()

    editor?.commands.removeDiscussion(0, 7)
    expect(editor?.isActive(Discussion.name)).toBeFalsy()
  })
})
