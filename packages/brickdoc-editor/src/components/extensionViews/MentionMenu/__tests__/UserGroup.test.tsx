import { Menu } from '@brickdoc/design-system'
import { render, screen, fireEvent } from '@testing-library/react'
import { mockEditor } from '../../../../test/editor'
import { UserGroup, UserGroupProps } from '../UserGroup'

describe('MentionMenuUserGroup', () => {
  const items: UserGroupProps['items'] = [
    {
      name: 'name 0',
      avatar: 'avatar 0',
      id: 'domain 0',
      command: jest.fn()
    },
    {
      name: 'name 1',
      avatar: 'avatar 1',
      id: 'domain 1',
      command: jest.fn()
    },
    {
      name: 'name 2',
      avatar: 'avatar 2',
      id: 'domain 2',
      command: jest.fn()
    }
  ]

  const editor = mockEditor()
  const props: UserGroupProps = {
    active: false,
    activeIndex: 0,
    editor,
    range: { from: 0, to: 1 },
    items
  }

  it('matches correct snapshot', () => {
    const { container } = render(
      <Menu baseId="user-group">
        <UserGroup {...props} />
      </Menu>
    )
    expect(container).toMatchSnapshot()
  })

  it('renders page items normally', () => {
    render(<UserGroup {...props} />)
    expect(screen.getAllByRole('menuitem')).toHaveLength(items.length)
  })

  it('handles item onSelect correctly', () => {
    const range = { from: 1, to: 2 }

    render(<UserGroup {...props} range={range} />)

    const menuItems = screen.getAllByRole('menuitem')

    fireEvent.click(menuItems[0])

    expect(items[0].command).toBeCalled()
  })
})
