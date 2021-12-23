import { render, screen } from '@testing-library/react'
import { MentionCommandsMenu, MentionCommandsMenuProps } from '../MentionMenu'

describe('MentionMenu', () => {
  const items: MentionCommandsMenuProps['items'] = {
    page: [{ icon: 'icon', name: 'page name', command: () => {} }],
    people: [{ avatar: 'avatar', name: 'people name', webid: 'webid', command: () => {} }]
  }
  const props: any = { items }

  it('matches correct snapshot', () => {
    const { container } = render(<MentionCommandsMenu {...props} />)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders menu normally', () => {
    render(<MentionCommandsMenu {...props} />)
    expect(screen.getByRole('menu')).toBeInTheDocument()
  })

  it('renders nothing if there are no matched items', () => {
    render(
      <MentionCommandsMenu
        {...props}
        items={{
          page: [],
          people: []
        }}
      />
    )
    expect(() => screen.getByRole('menu')).toThrow()
  })
})
