import { Menu } from '@brickdoc/design-system'
import { render, screen, fireEvent } from '@testing-library/react'
import { UserGroup, UserGroupProps } from '../UserGroup'

describe('MentionMenuUserGroup', () => {
  const items: UserGroupProps['items'] = [
    {
      name: 'name 0',
      avatar: 'avatar 0',
      domain: 'domain 0',
      command: jest.fn()
    },
    {
      name: 'name 1',
      avatar: 'avatar 1',
      domain: 'domain 1',
      command: jest.fn()
    },
    {
      name: 'name 2',
      avatar: 'avatar 2',
      domain: 'domain 2',
      command: jest.fn()
    }
  ]

  const props: any = {
    items
  }

  it('matches correct snapshot', () => {
    const { container } = render(
      <Menu baseId="user-group">
        <UserGroup {...props} />
      </Menu>
    )
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders page items normally', () => {
    render(<UserGroup {...props} />)
    expect(screen.getAllByRole('menuitem')).toHaveLength(items.length)
  })

  it('handles item onSelect correctly', () => {
    const editor: any = {}
    const range = { from: 1, to: 2 }

    render(<UserGroup {...props} editor={editor} range={range} />)

    const menuItems = screen.getAllByRole('menuitem')

    fireEvent.click(menuItems[0])

    expect(items[0].command).toBeCalledWith(editor, range)
  })
})
