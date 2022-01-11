import { SlashMenu } from '../SlashMenu'
import { render, screen, fireEvent } from '@testing-library/react'

describe('SlashMenu', () => {
  const iconText = 'icon'
  const slashMenuItems = [
    {
      key: 'h1',
      icon: <div>{iconText}</div>,
      command: () => {}
    },
    {
      key: 'h2',
      icon: <div>{iconText}</div>,
      command: () => {}
    },
    {
      key: 'h3',
      icon: <div>{iconText}</div>,
      command: () => {}
    }
  ]
  it('matches correct snapshot', () => {
    const items = {
      type: slashMenuItems,
      suggestion: slashMenuItems,
      recent: slashMenuItems
    }

    const { container } = render(<SlashMenu items={items} command={() => {}} />)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders menu items correctly', () => {
    const items = {
      type: slashMenuItems,
      suggestion: slashMenuItems,
      recent: []
    }

    render(<SlashMenu items={items} command={() => {}} />)

    const menuItems = screen.getAllByRole('menuitem')

    expect(screen.getByRole('menubar')).toBeInTheDocument()
    expect(menuItems).toHaveLength(3)

    items.type.forEach((item, index) => {
      expect(menuItems[index]).toHaveTextContent(iconText)
    })
  })

  it('selects menu item normally', () => {
    const mockCommand = jest.fn()
    const items = {
      type: slashMenuItems,
      suggestion: slashMenuItems,
      recent: []
    }

    render(<SlashMenu items={items} command={mockCommand} />)

    const menuItems = screen.getAllByRole('menuitem')

    const clickedIndex = 1

    fireEvent.click(menuItems[clickedIndex])

    expect(mockCommand).toBeCalledTimes(1)
    expect(mockCommand).toBeCalledWith(items.type[clickedIndex])
  })
})
