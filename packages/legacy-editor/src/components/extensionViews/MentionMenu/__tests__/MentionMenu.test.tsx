import { render, screen } from '@testing-library/react'
import { mockEditor } from '../../../../test/editor'
import { MentionCommandsMenu, MentionCommandsMenuProps } from '../MentionMenu'

describe('MentionMenu', () => {
  const items: MentionCommandsMenuProps['items'] = {
    pages: [{ id: 'p1', parentId: 'parentId', link: 'link', icon: 'icon', title: 'page name', command: () => {} }],
    users: [{ avatar: 'avatar', name: 'people name', id: 'domain', command: () => {} }]
  }
  const editor = mockEditor()
  const props: MentionCommandsMenuProps = {
    items,
    activeCategory: 'users',
    activeIndex: 0,
    editor,
    range: { from: 0, to: 1 },
    query: '',
    command: () => {}
  }

  it('matches correct snapshot', () => {
    const { container } = render(<MentionCommandsMenu {...props} baseId="mention" />)
    expect(container).toMatchSnapshot()
  })

  it('renders menu normally', () => {
    render(<MentionCommandsMenu {...props} />)
    expect(screen.getByRole('menubar')).toBeInTheDocument()
  })

  it('renders nothing if there are no matched items', () => {
    render(
      <MentionCommandsMenu
        {...props}
        items={{
          users: [],
          pages: []
        }}
      />
    )
    expect(() => screen.getByRole('menu')).toThrow()
  })
})
