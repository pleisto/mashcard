import * as React from 'react'
import { mount } from 'enzyme'
import { SlashCommandsMenu } from '../SlashCommandsMenu'

describe('SlashCommandsMenu', () => {
  it('renders menu items correctly', () => {
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
      },
      {
        title: 'H3',
        desc: 'h3',
        icon: <div>icon</div>,
        command: () => {}
      }
    ]

    const commandsMenu = mount(<SlashCommandsMenu items={items} command={() => {}} />)

    expect(commandsMenu.find('.brickdoc-slash-menu').length).toBe(1)
    expect(commandsMenu.find('button.slash-menu-item').length).toBe(3)
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

    const commandsMenu = mount(<SlashCommandsMenu items={items} command={mockCommand} />)

    const firstItem = commandsMenu.find('button.slash-menu-item').at(0)
    const secondItem = commandsMenu.find('button.slash-menu-item').at(1)

    firstItem.simulate('click')

    expect(firstItem.hasClass('active')).toBeTruthy()
    expect(secondItem.hasClass('active')).toBeFalsy()
    expect(mockCommand).toBeCalledTimes(1)
    expect(mockCommand).toBeCalledWith(items[0])
  })

  describe('instance function onKeyDown', () => {
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
      },
      {
        title: 'H3',
        desc: 'h3',
        icon: <div>icon</div>,
        command: () => {}
      }
    ]

    function keyDown(component, eventKey): void {
      component.instance().onKeyDown({ event: { key: eventKey } })
    }

    it('triggers `ArrowUp` correctly', () => {
      const commandsMenu = mount<SlashCommandsMenu>(<SlashCommandsMenu items={items} command={() => {}} />)

      expect(commandsMenu.state('selectedIndex')).toBe(0)

      keyDown(commandsMenu, 'ArrowUp')
      expect(commandsMenu.state('selectedIndex')).toBe(2)

      keyDown(commandsMenu, 'ArrowUp')
      expect(commandsMenu.state('selectedIndex')).toBe(1)

      keyDown(commandsMenu, 'ArrowUp')
      expect(commandsMenu.state('selectedIndex')).toBe(0)
    })

    it('triggers `ArrowDown` correctly', () => {
      const commandsMenu = mount<SlashCommandsMenu>(<SlashCommandsMenu items={items} command={() => {}} />)

      expect(commandsMenu.state('selectedIndex')).toBe(0)

      keyDown(commandsMenu, 'ArrowDown')
      expect(commandsMenu.state('selectedIndex')).toBe(1)

      keyDown(commandsMenu, 'ArrowDown')
      expect(commandsMenu.state('selectedIndex')).toBe(2)

      keyDown(commandsMenu, 'ArrowDown')
      expect(commandsMenu.state('selectedIndex')).toBe(0)
    })

    it('triggers `Enter` correctly', () => {
      const mockCommand = jest.fn()
      const commandsMenu = mount<SlashCommandsMenu>(<SlashCommandsMenu items={items} command={mockCommand} />)

      keyDown(commandsMenu, 'Enter')
      expect(mockCommand).toBeCalledTimes(1)
      expect(mockCommand).toBeCalledWith(items[0])

      keyDown(commandsMenu, 'ArrowDown')
      keyDown(commandsMenu, 'Enter')
      expect(mockCommand).toBeCalledTimes(2)
      expect(mockCommand).toBeCalledWith(items[1])

      keyDown(commandsMenu, 'ArrowDown')
      keyDown(commandsMenu, 'Enter')
      expect(mockCommand).toBeCalledTimes(3)
      expect(mockCommand).toBeCalledWith(items[2])

      keyDown(commandsMenu, 'ArrowDown')
      keyDown(commandsMenu, 'Enter')
      expect(mockCommand).toBeCalledTimes(4)
      expect(mockCommand).toBeCalledWith(items[0])
    })

    it('triggers Unexpected key will not cause error', () => {
      const mockCommand = jest.fn()
      const commandsMenu = mount<SlashCommandsMenu>(<SlashCommandsMenu items={items} command={mockCommand} />)

      expect(() => {
        keyDown(commandsMenu, 'Unexpected')
      }).not.toThrow()
      expect(mockCommand).toBeCalledTimes(0)
      expect(commandsMenu.state('selectedIndex')).toBe(0)
    })
  })
})
