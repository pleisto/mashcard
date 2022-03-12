import { render, screen, fireEvent } from '@testing-library/react'
import { PeoplePanel, PeoplePanelProps } from '../PeoplePanel'

describe('MentionMenuPeoplePanel', () => {
  const items: PeoplePanelProps['items'] = [
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
    const { container } = render(<PeoplePanel {...props} />)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders page items normally', () => {
    render(<PeoplePanel {...props} />)
    expect(screen.getAllByRole('menuitem')).toHaveLength(items.length)
  })

  it('renders active item correspond to active index', () => {
    const activeIndex = 1
    render(<PeoplePanel {...props} active={true} activeIndex={activeIndex} />)
    const items = screen.getAllByRole('menuitem')

    expect(items[activeIndex]).toHaveClass('active')
  })

  it('handles item onSelect correctly', () => {
    const editor: any = {}
    const range = { from: 1, to: 2 }

    render(<PeoplePanel {...props} editor={editor} range={range} />)

    const menuItems = screen.getAllByRole('menuitem')

    fireEvent.click(menuItems[0])

    expect(items[0].command).toBeCalledWith(editor, range)
  })
})
