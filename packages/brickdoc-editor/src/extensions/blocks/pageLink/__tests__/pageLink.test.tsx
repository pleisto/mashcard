import { escape } from '@brickdoc/active-support'
import { render } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'
import { TestEditorContent, useTestEditor } from '../../../../test/testEditor'
import { PageLink } from '../pageLink'

jest.mock('react-router-dom', () => ({
  // eslint-disable-next-line jsx-a11y/anchor-has-content
  Link: (props: any) => <a {...props} />
}))

describe('PageLink', () => {
  it('renders PageLink correctly', () => {
    const content = `
    <page-link-block
      data-page="${escape(JSON.stringify({ type: 'PAGE' }))}"
    ></page-link-block>
    `
    const { container } = render(<TestEditorContent content={content} extensions={[PageLink]} />)

    expect(container).toMatchSnapshot()
  })

  it('triggers setPageLinkBlock correctly', () => {
    const { result } = renderHook(() =>
      useTestEditor({
        extensions: [PageLink]
      })
    )

    const editor = result.current
    const position = 0

    editor?.commands.setPageLinkBlock('id', 'link', 'title', 'icon')

    // page link is an inline block which wrapped in paragraph
    expect(editor?.state.doc.nodeAt(position)?.firstChild?.type.name).toBe(PageLink.name)
  })
})
