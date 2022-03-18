import { Menu } from '@brickdoc/design-system'
import { render, screen, fireEvent } from '@testing-library/react'
import { PageGroup, PageGroupProps } from '../PageGroup'

describe('MentionMenuPageGroup', () => {
  const items: PageGroupProps['items'] = [
    {
      name: 'page name 0',
      icon: 'icon 0',
      command: jest.fn()
    },
    {
      name: 'page name 1',
      icon: 'icon 1',
      command: jest.fn()
    },
    {
      name: 'page name 2',
      icon: null,
      command: jest.fn()
    }
  ]

  const props: any = {
    items
  }

  it('matches correct snapshot', () => {
    const { container } = render(
      <Menu baseId="page-group">
        <PageGroup {...props} />
      </Menu>
    )
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders page items normally', () => {
    render(<PageGroup {...props} />)
    expect(screen.getAllByRole('menuitem')).toHaveLength(items.length)
  })

  it('handles item onSelect correctly', () => {
    const editor: any = {}
    const range = { from: 1, to: 2 }

    render(<PageGroup {...props} editor={editor} range={range} />)

    const menuItems = screen.getAllByRole('menuitem')

    fireEvent.click(menuItems[0])

    expect(items[0].command).toBeCalledWith(editor, range)
  })
})
