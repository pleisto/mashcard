import { Menu } from '@mashcard/design-system'
import { render, screen, fireEvent } from '@testing-library/react'
import { mockEditor } from '../../../../test/editor'
import { PageGroup, PageGroupProps } from '../PageGroup'

describe('MentionMenuPageGroup', () => {
  const items: PageGroupProps['items'] = [
    {
      id: 'p0',
      parentId: 'p',
      link: 'link',
      title: 'page name 0',
      icon: 'icon 0',
      command: jest.fn()
    },
    {
      id: 'p1',
      parentId: 'p',
      link: 'link',
      title: 'page name 1',
      icon: 'icon 1',
      command: jest.fn()
    },
    {
      id: 'p2',
      parentId: 'p',
      link: 'link',
      title: 'page name 2',
      icon: null,
      command: jest.fn()
    }
  ]

  const editor = mockEditor()
  const props: PageGroupProps = {
    editor,
    range: { from: 0, to: 1 },
    activeIndex: 0,
    active: false,
    items
  }

  it('matches correct snapshot', () => {
    const { container } = render(
      <Menu baseId="page-group">
        <PageGroup {...props} />
      </Menu>
    )
    expect(container).toMatchSnapshot()
  })

  it('renders page items normally', () => {
    render(<PageGroup {...props} />)
    expect(screen.getAllByRole('menuitem')).toHaveLength(items.length)
  })

  it('handles item onSelect correctly', () => {
    const range = { from: 1, to: 2 }

    render(<PageGroup {...props} range={range} />)

    const menuItems = screen.getAllByRole('menuitem')

    fireEvent.click(menuItems[0])

    expect(items[0].command).toBeCalled()
  })
})
