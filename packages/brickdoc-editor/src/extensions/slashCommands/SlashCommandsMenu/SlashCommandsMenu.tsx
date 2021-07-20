import * as React from 'react'
import { MenuItem } from '..'
import { SlashMenuItem } from './SlashMenuItem'
import './index.less'

interface SlashCommandsMenuProps {
  items: MenuItem[]
  command: (item: MenuItem) => void
}

// We need expose instance function onKeyDown for suggestion extension.
// And reactRenderer only access ref of a class component, thus SlashCommandsMenu must be a class component.
export class SlashCommandsMenu extends React.PureComponent<SlashCommandsMenuProps> {
  state = {
    selectedIndex: 0
  }

  selectItem = (index: number) => () => {
    const item = this.props.items[index]
    if (item) {
      this.props.command(item)
    }
  }

  onKeyDown({ event }): boolean {
    const { items } = this.props
    const { selectedIndex } = this.state

    const setSelectedIndex = (index: number): void => this.setState({ selectedIndex: index })

    if (event.key === 'ArrowUp') {
      setSelectedIndex((selectedIndex + items.length - 1) % items.length)
      return true
    }

    if (event.key === 'ArrowDown') {
      setSelectedIndex((selectedIndex + 1) % items.length)
      return true
    }

    if (event.key === 'Enter') {
      this.selectItem(selectedIndex)()
      return true
    }

    return false
  }

  render(): React.ReactElement {
    const { items } = this.props
    const { selectedIndex } = this.state

    return (
      <div className="brickdoc-slash-menu">
        <div className="slash-menu-heading">Brickdoc</div>
        {items.map((item, index) => (
          <SlashMenuItem
            key={index}
            active={index === selectedIndex}
            title={item.title}
            desc={item.desc}
            icon={item.icon}
            onClick={this.selectItem(index)}
          />
        ))}
      </div>
    )
  }
}
