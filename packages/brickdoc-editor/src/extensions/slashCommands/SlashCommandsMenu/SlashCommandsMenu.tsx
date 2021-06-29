/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import * as React from 'react'
import cx from 'classnames'
import { MenuItem } from '..'
import styles from './index.module.less'

interface SlashCommandsMenuProps {
  items: MenuItem[]
  command: (item: MenuItem) => void
}

// We need expose instance function onKeyDown for suggestion extension.
// And reactRenderer only access ref of a class component, thus SlashCommandsMenu must be a class component.
class SlashCommandsMenu extends React.PureComponent<SlashCommandsMenuProps> {
  state = {
    selectedIndex: 0
  }

  selectItem = (index: number) => () => {
    const item = this.props.items[index]
    if (item) {
      this.props.command(item)
    }
  }

  onKeyDown({ event }) {
    const { items } = this.props
    const { selectedIndex } = this.state

    const setSelectedIndex = index => this.setState({ selectedIndex: index })

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

  render() {
    const { items } = this.props
    const { selectedIndex } = this.state

    // TODO: temporary UI
    return (
      <div className={styles.menuItems}>
        {items.map((item, index) => (
          <div
            role="menuitem"
            className={cx(styles.menuItem, { [styles.active]: index === selectedIndex })}
            key={index}
            onClick={this.selectItem(index)}>
            {item.title}
          </div>
        ))}
      </div>
    )
  }
}

export default SlashCommandsMenu
