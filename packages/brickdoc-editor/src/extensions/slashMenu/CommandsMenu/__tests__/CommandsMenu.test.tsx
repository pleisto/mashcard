import * as React from 'react'
import { shallow } from 'enzyme'
import CommandsMenu from '../CommandsMenu'

describe('CommandsMenu', () => {
  it('render menu items', () => {
    const items = [{
      title: 'H1',
      command: () => {},
    }, {
      title: 'H2',
      command: () => {},
    }, {
      title: 'H3',
      command: () => {},
    }]

    const commandsMenu = shallow(
      <CommandsMenu items={items} command={() => {}} />
    )

    expect(commandsMenu.find('.menuItems').length).toBe(1)
    expect(commandsMenu.find('.menuItem').length).toBe(3)
  })

  it('select menu item', () => {
    const mockCommand = jest.fn()
    const items = [{
      title: 'H1',
      command: () => {},
    }, {
      title: 'H2',
      command: () => {},
    }]

    const commandsMenu = shallow(
      <CommandsMenu items={items} command={mockCommand} />
    )

    const firstItem = commandsMenu.find('.menuItem').at(0)
    const secondItem = commandsMenu.find('.menuItem').at(1)

    firstItem.simulate('click')

    expect(firstItem.hasClass('active')).toBeTruthy()
    expect(secondItem.hasClass('active')).toBeFalsy()
    expect(mockCommand).toBeCalledTimes(1)
    expect(mockCommand).toBeCalledWith(items[0])
  })

  describe('instance function onKeyDown', () => {
    const items = [{
      title: 'H1',
      command: () => {},
    }, {
      title: 'H2',
      command: () => {},
    }, {
      title: 'H3',
      command: () => {},
    }]

    function keyDown(component, eventKey) {
      component.instance().onKeyDown({ event: { key: eventKey } })
    }

    it('ArrowUp', () => {
      const commandsMenu = shallow<CommandsMenu>(
        <CommandsMenu items={items} command={() => {}} />
      )

      expect(commandsMenu.state('selectedIndex')).toBe(0)

      keyDown(commandsMenu, 'ArrowUp')
      expect(commandsMenu.state('selectedIndex')).toBe(2)

      keyDown(commandsMenu, 'ArrowUp')
      expect(commandsMenu.state('selectedIndex')).toBe(1)

      keyDown(commandsMenu, 'ArrowUp')
      expect(commandsMenu.state('selectedIndex')).toBe(0)
    })

    it('ArrowDown', () => {
      const commandsMenu = shallow<CommandsMenu>(
        <CommandsMenu items={items} command={() => {}} />
      )

      expect(commandsMenu.state('selectedIndex')).toBe(0)

      keyDown(commandsMenu, 'ArrowDown')
      expect(commandsMenu.state('selectedIndex')).toBe(1)

      keyDown(commandsMenu, 'ArrowDown')
      expect(commandsMenu.state('selectedIndex')).toBe(2)

      keyDown(commandsMenu, 'ArrowDown')
      expect(commandsMenu.state('selectedIndex')).toBe(0)
    })

    it('Enter', () => {
      const mockCommand = jest.fn()
      const commandsMenu = shallow<CommandsMenu>(
        <CommandsMenu items={items} command={mockCommand} />
      )

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

    it('Unexpected', () => {
      const mockCommand = jest.fn()
      const commandsMenu = shallow<CommandsMenu>(
        <CommandsMenu items={items} command={mockCommand} />
      )

      expect(() => {
        keyDown(commandsMenu, 'Unexpected')
      }).not.toThrow()
      expect(mockCommand).toBeCalledTimes(0)
      expect(commandsMenu.state('selectedIndex')).toBe(0)
    })
  })
})