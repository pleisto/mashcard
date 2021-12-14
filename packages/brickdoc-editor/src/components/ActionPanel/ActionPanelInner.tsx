import React from 'react'
import cx from 'classnames'
import { Button, Dropdown, Menu, Popover } from '@brickdoc/design-system'
import './ActionPanel.less'
import { ActionDropdownOption, ActionOption, ActionPanelProps } from './ActionPanel'

const OptionButton: React.FC<{ option: ActionOption; onClick?: (event: any) => void }> = ({ option, ...props }) => (
  <Button
    {...props}
    onClick={event => {
      props.onClick?.(event)
      option.onClick?.()
    }}
    className={cx('brickdoc-action-panel-button', { active: option.active })}
    type="text">
    {option.Icon}
  </Button>
)

const OptionDropdown: React.FC<{ option: ActionDropdownOption }> = ({ option }) => (
  <Dropdown
    overlay={
      <Menu className="brickdoc-action-panel-dropdown-menu">
        {option.menuItems.map((item, index) => {
          if (item.type === 'item') {
            return (
              <Menu.Item onClick={() => item.onClick?.(() => {})} className="brickdoc-action-panel-dropdown-menu-item" key={item.name}>
                {item.content && item.content}
                {!item.content &&
                  item.Icon &&
                  React.cloneElement(item.Icon, { className: 'brickdoc-action-panel-dropdown-menu-item-icon' })}
                {!item.content && item.name}
              </Menu.Item>
            )
          } else {
            return <Menu.Divider key={index} className="brickdoc-action-panel-dropdown-menu-divider" />
          }
        })}
      </Menu>
    }>
    <OptionButton option={option} />
  </Dropdown>
)

const OptionPopover: React.FC<{ option: ActionDropdownOption }> = ({ option }) => {
  const [visible, setVisible] = React.useState(false)
  const handleVisibleChange = (visible: boolean): void => setVisible(visible)
  return (
    <Popover
      trigger="click"
      placement="bottom"
      visible={visible}
      onVisibleChange={handleVisibleChange}
      overlayClassName="brickdoc-action-panel-popover"
      content={
        <Menu className="brickdoc-action-panel-popover-menu">
          {option.menuItems.map((item, index) => {
            if (item.type === 'item') {
              return (
                <Menu.Item
                  onClick={() => item.onClick?.(() => setVisible(false))}
                  className={cx('brickdoc-action-panel-popover-menu-item', { 'brk-menu-item-selected': item.active })}
                  key={item.name}>
                  {item.content && item.content}
                  {!item.content &&
                    item.Icon &&
                    React.cloneElement(item.Icon, { className: 'brickdoc-action-panel-popover-menu-item-icon' })}
                  {!item.content && item.name}
                </Menu.Item>
              )
            } else {
              return <Menu.Divider key={index} className="brickdoc-action-panel-popover-menu-divider" />
            }
          })}
        </Menu>
      }>
      <OptionButton option={option} />
    </Popover>
  )
}

const Option: React.FC<{ option: ActionOption }> = ({ option }) => {
  if (option.type === 'button') {
    return <OptionButton option={option} />
  }

  if (option.dropdownType === 'popover') {
    return <OptionPopover option={option} />
  }

  return <OptionDropdown option={option} />
}

export const ActionPanelInner: React.FC<ActionPanelProps> = ({ options }) => {
  return (
    <div className="brickdoc-action-panel">
      {options.reduce<React.ReactElement[]>((elements, option, index) => {
        if (Array.isArray(option))
          return [
            ...elements,
            ...option.map(option => <Option key={index} option={option} />),
            <div key={`divider${index}`} className="brickdoc-action-panel-divider" />
          ]
        return [...elements, <Option key={index} option={option} />]
      }, [])}
    </div>
  )
}
