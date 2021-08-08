import * as React from 'react'
import { SlashCommandsMenu } from '../SlashCommandsMenu'
import { render, screen, fireEvent } from '@testing-library/react'

describe('SlashCommandsMenu', () => {
  it('matches correct snapshot', () => {
    const iconText = 'icon'
    const items = [
      {
        title: 'H1',
        desc: 'h1',
        icon: <div>{iconText}</div>,
        command: () => {}
      },
      {
        title: 'H2',
        desc: 'h2',
        icon: <div>{iconText}</div>,
        command: () => {}
      },
      {
        title: 'H3',
        desc: 'h3',
        icon: <div>{iconText}</div>,
        command: () => {}
      }
    ]

    const { container } = render(<SlashCommandsMenu items={items} command={() => {}} />)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders menu items correctly', () => {
    const iconText = 'icon'
    const items = [
      {
        title: 'H1',
        desc: 'h1',
        icon: <div>{iconText}</div>,
        command: () => {}
      },
      {
        title: 'H2',
        desc: 'h2',
        icon: <div>{iconText}</div>,
        command: () => {}
      },
      {
        title: 'H3',
        desc: 'h3',
        icon: <div>{iconText}</div>,
        command: () => {}
      }
    ]

    render(<SlashCommandsMenu items={items} command={() => {}} />)

    const menuItems = screen.getAllByRole('menuitem')

    expect(screen.getByRole('menu')).toBeInTheDocument()
    expect(menuItems).toHaveLength(3)

    items.forEach((item, index) => {
      expect(menuItems[index]).toHaveTextContent(item.title)
      expect(menuItems[index]).toHaveTextContent(item.desc)
      expect(menuItems[index]).toHaveTextContent(iconText)
    })
  })

  it('renders active class correctly correspond to active index', () => {
    const iconText = 'icon'
    const items = [
      {
        title: 'H1',
        desc: 'h1',
        icon: <div>{iconText}</div>,
        command: () => {}
      },
      {
        title: 'H2',
        desc: 'h2',
        icon: <div>{iconText}</div>,
        command: () => {}
      },
      {
        title: 'H3',
        desc: 'h3',
        icon: <div>{iconText}</div>,
        command: () => {}
      }
    ]

    const activeIndex = 1

    render(<SlashCommandsMenu items={items} activeIndex={activeIndex} command={() => {}} />)

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
        title: 'H1',
        desc: 'h1',
        icon: <div>icon</div>,
        command: () => {}
      },
      {
        title: 'H2',
        desc: 'h2',
        icon: <div>icon</div>,
        command: () => {}
      }
    ]

    render(<SlashCommandsMenu items={items} command={mockCommand} />)

    const menuItems = screen.getAllByRole('menuitem')

    const clickedIndex = 1

    fireEvent.click(menuItems[clickedIndex])

    expect(mockCommand).toBeCalledTimes(1)
    expect(mockCommand).toBeCalledWith(items[clickedIndex])
  })

  it('hovers on menu item will change active index', () => {
    const items = [
      {
        title: 'H1',
        desc: 'h1',
        icon: <div>icon</div>,
        command: () => {}
      },
      {
        title: 'H2',
        desc: 'h2',
        icon: <div>icon</div>,
        command: () => {}
      }
    ]
    const mockIndexChange = jest.fn()

    render(<SlashCommandsMenu items={items} command={() => {}} onIndexChange={mockIndexChange} />)

    const menuItems = screen.getAllByRole('menuitem')

    const hoverIndex = 1

    fireEvent.mouseEnter(menuItems[hoverIndex])

    expect(mockIndexChange).toBeCalledTimes(1)
    expect(mockIndexChange).toBeCalledWith(hoverIndex)
  })
})
