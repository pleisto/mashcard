import { SlashMenu } from '../SlashMenu'
import { render, screen, fireEvent } from '@testing-library/react'

describe('SlashMenu', () => {
  it('matches correct snapshot', () => {
    const iconText = 'icon'
    const items = [
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

    const { container } = render(<SlashMenu items={items} command={() => {}} />)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders menu items correctly', () => {
    const iconText = 'icon'
    const items = [
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

    render(<SlashMenu items={items} command={() => {}} />)

    const menuItems = screen.getAllByRole('menuitem')

    expect(screen.getByRole('menu')).toBeInTheDocument()
    expect(menuItems).toHaveLength(3)

    items.forEach((item, index) => {
      expect(menuItems[index]).toHaveTextContent(iconText)
    })
  })

  it('renders active class correctly correspond to active index', () => {
    const iconText = 'icon'
    const items = [
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

    const activeIndex = 1

    render(<SlashMenu items={items} activeIndex={activeIndex} command={() => {}} />)

    expect(screen.getByRole('menu')).toBeInTheDocument()

    const menuItems = screen.getAllByRole('menuitem')

    expect(menuItems[activeIndex]).toHaveClass('active')
    menuItems.forEach((item, index) => {
      if (index === activeIndex) return
      expect(item).not.toHaveClass('active')
    })
  })

  it('selects menu item normally', () => {
    const mockCommand = jest.fn()
    const items = [
      {
        key: 'h1',
        icon: <div>icon</div>,
        command: () => {}
      },
      {
        key: 'h2',
        icon: <div>icon</div>,
        command: () => {}
      }
    ]

    render(<SlashMenu items={items} command={mockCommand} />)

    const menuItems = screen.getAllByRole('menuitem')

    const clickedIndex = 1

    fireEvent.click(menuItems[clickedIndex])

    expect(mockCommand).toBeCalledTimes(1)
    expect(mockCommand).toBeCalledWith(items[clickedIndex])
  })

  it('hovers on menu item will change active index', () => {
    const items = [
      {
        key: 'h1',
        icon: <div>icon</div>,
        command: () => {}
      },
      {
        key: 'h2',
        icon: <div>icon</div>,
        command: () => {}
      }
    ]
    const mockIndexChange = jest.fn()

    render(<SlashMenu items={items} command={() => {}} onIndexChange={mockIndexChange} />)

    const menuItems = screen.getAllByRole('menuitem')

    const hoverIndex = 1

    fireEvent.mouseEnter(menuItems[hoverIndex])

    expect(mockIndexChange).toBeCalledTimes(1)
    expect(mockIndexChange).toBeCalledWith(hoverIndex)
  })
})
