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
    const yDoc = new Y.Doc()
    const awareness = new awarenessProtocol.Awareness(yDoc)
    const provider = { awareness }
    const { result } = renderHook(() =>
      useEditor({
        autofocus: true,
        base: {
          bubbleMenu: {
            element: document.createElement('div')
          },
          collaboration: {
            document: yDoc
          },
          collaborationCursor: {
            provider
          }
        },
        content: `
        <h1>heading1</h1>
        <h2>heading2</h2>
        <h3>heading3</h3>
        <h4>heading4</h4>
        <h5>heading5</h5>
        `
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
