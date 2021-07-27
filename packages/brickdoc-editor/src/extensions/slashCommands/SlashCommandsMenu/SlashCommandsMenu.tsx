import * as React from 'react'
import { Editor, Range } from '@tiptap/react'
import { SlashMenuItem } from './SlashMenuItem'
import './index.less'

export interface SlashCommandsMenuItem {
  title: string
  desc: string
  icon: React.ReactNode
  command: ({ editor, range }: { editor: Editor; range: Range }) => void
}

export interface SlashCommandsMenuProps {
  items: SlashCommandsMenuItem[]
  command: (item: SlashCommandsMenuItem) => void
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

  onKeyDown(key: string): boolean {
    const { items } = this.props
    const { selectedIndex } = this.state

    const setSelectedIndex = (index: number): void => this.setState({ selectedIndex: index })

    if (key === 'ArrowUp') {
      setSelectedIndex((selectedIndex + items.length - 1) % items.length)
      return true
    }

    if (key === 'ArrowDown') {
      setSelectedIndex((selectedIndex + 1) % items.length)
      return true
    }

    if (key === 'Enter') {
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
