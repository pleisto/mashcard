import { escape } from '@brickdoc/active-support'
import { render } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'
import { TestEditorContent, useTestEditor } from '../../../../test/testEditor'
import { User } from '../user'

describe('User', () => {
  it('renders User correctly', () => {
    const content = `
    <user-block
      data-people="${escape(JSON.stringify({ type: 'PEOPLE' }))}"
    ></user-block>
    `
    const { container } = render(<TestEditorContent content={content} extensions={[User]} />)

    expect(container).toMatchSnapshot()
  })

  it('triggers setUserBlock correctly', () => {
    const { result } = renderHook(() =>
      useTestEditor({
        extensions: [User]
      })
    )

    const editor = result.current
    const position = 0

    editor?.commands.setUserBlock('domain', 'name', 'avatarUrl')

    // user is an inline block which wrapped in paragraph
    expect(editor?.state.doc.nodeAt(position)?.firstChild?.type.name).toBe(User.name)
  })
})
