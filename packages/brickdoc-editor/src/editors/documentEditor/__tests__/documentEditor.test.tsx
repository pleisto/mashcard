import { render } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'
import { EditorContent, useEditor } from '../documentEditor'

jest.mock('react-router-dom', () => ({
  useNavigate: () => () => {}
}))

describe('documentEditor', () => {
  it('renders document editor correctly', () => {
    const onSave = jest.fn()
    const { result } = renderHook(() =>
      useEditor({
        base: {
          sync: {
            onSave
          }
        }
      })
    )
    const editor = result.current
    const { container } = render(<EditorContent editor={editor} editable={true} navigate={jest.fn()} />, {
      // prosemirror will modify dom manually, add a wrapper for this purpose
      wrapper: ({ children }) => <div>{children}</div>
    })

    expect(container).toMatchSnapshot()
  })
})
