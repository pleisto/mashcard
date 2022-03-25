import { render } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'
import { ExternalProps } from '../../../context'
import { EditorContent, useEditor } from '../documentEditor'

describe('documentEditor', () => {
  it('renders document editor correctly', () => {
    const externalProps = new ExternalProps()
    const onSave = jest.fn()
    const { result } = renderHook(() => useEditor({ externalProps, onSave }))
    const editor = result.current
    const { container } = render(<EditorContent editor={editor} externalProps={externalProps} />, {
      // prosemirror will modify dom manually, add a wrapper for this purpose
      wrapper: ({ children }) => <div>{children}</div>
    })

    expect(container).toMatchSnapshot()
  })
})
