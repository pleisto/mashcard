import { render } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'
import { EditorPropsContext } from '../../../context'
import { EditorContent, useEditor } from '../documentEditor'

describe('documentEditor', () => {
  it('renders document editor correctly', () => {
    const editorProps = { ...EditorPropsContext }
    const onSave = jest.fn()
    const { result } = renderHook(() => useEditor({ props: editorProps, onSave }))
    const editor = result.current
    const { container } = render(<EditorContent editor={editor} {...editorProps} />, {
      // prosemirror will modify dom manually, add a wrapper for this purpose
      wrapper: ({ children }) => <div>{children}</div>
    })

    expect(container).toMatchSnapshot()
  })
})
