import { render } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'
import { EditorContent, useEditor } from '../documentEditor'
import * as Y from 'yjs'
import * as awarenessProtocol from 'y-protocols/awareness'

jest.mock('react-router-dom', () => ({
  useNavigate: () => () => {}
}))

describe('documentEditor', () => {
  it('renders document editor correctly', () => {
    const onSave = jest.fn()
    const document = new Y.Doc()
    const awareness = new awarenessProtocol.Awareness(document)
    const provider = { awareness }
    const { result } = renderHook(() =>
      useEditor({
        autofocus: true,
        base: {
          sync: {
            onSave
          },
          collaboration: {
            document
          },
          collaborationCursor: {
            provider
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

    // ensure collaborationCursor `provider` is set (tiptap deepMerge bug)
    const collaborationCursorExtension = editor?.extensionManager.extensions.find(e => e.name === 'collaborationCursor')
    expect(collaborationCursorExtension?.options.provider).toStrictEqual(provider)
  })
})
