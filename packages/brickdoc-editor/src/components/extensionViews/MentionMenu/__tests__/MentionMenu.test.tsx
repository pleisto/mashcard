import { render, screen } from '@testing-library/react'
import { MentionCommandsMenu, MentionCommandsMenuProps } from '../MentionMenu'

describe('MentionMenu', () => {
  const items: MentionCommandsMenuProps['items'] = {
    pages: [{ icon: 'icon', name: 'page name', command: () => {} }],
    users: [{ avatar: 'avatar', name: 'people name', domain: 'domain', command: () => {} }]
  }
  const props: any = { items }

  it('matches correct snapshot', () => {
    const { container } = render(<MentionCommandsMenu {...props} baseId="mention" />)
    expect(container.firstChild).toMatchSnapshot()
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
