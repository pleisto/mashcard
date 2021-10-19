import React from 'react'
import cx from 'classnames'
import { Tag, Button, Icon, Popover, Menu, Input } from '@brickdoc/design-system'
import { TableColumnSelectOption } from 'react-table'
import { bgColor } from './SelectCell'
import { COLOR } from '../../../../color'

export interface SelectCellOptionProps {
  option: TableColumnSelectOption
  onOptionValueChange: (option: TableColumnSelectOption) => void
  onMenuVisibleChange?: (visible: boolean) => void
  onOptionRemove: (option: TableColumnSelectOption) => void
}

export const SelectCellOption: React.FC<SelectCellOptionProps> = ({ option, onOptionValueChange, onOptionRemove, onMenuVisibleChange }) => {
  const [visible, setVisible] = React.useState(false)
  const handleVisibleChange = (visible: boolean): void => {
    setVisible(visible)
    onMenuVisibleChange?.(visible)
  }
  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.stopPropagation()
    setVisible(!visible)
  }
  const inputRef = React.useRef<Input | null>()

  return (
    <div className="select-cell-option-item" role="listitem">
      <Tag color={bgColor(option.color)} style={{ color: option.color }}>
        {option.label}
      </Tag>
      <Popover
        trigger="click"
        overlayClassName="table-block-menu-popover"
        overlayStyle={{ zIndex: 1054 }}
        content={
          <Menu className="table-block-menu" onClick={e => e.domEvent.stopPropagation()}>
            <Menu.Item key="Header" className="table-block-menu-item input-item" onClick={() => inputRef.current?.focus()}>
              <Input
                ref={container => {
                  inputRef.current = container
                }}
                onPressEnter={() => setVisible(false)}
                onFocus={e => {
                  e.target.setSelectionRange(0, e.target.value?.length ?? 0)
                }}
                onChange={e => onOptionValueChange({ ...option, label: e.target.value })}
                className="table-block-menu-input"
                value={option.label}
              />
            </Menu.Item>
            <Menu.Item onClick={() => onOptionRemove(option)} className="table-block-menu-item" key="Delete">
              <Icon.Delete />
              <span>Delete</span>
            </Menu.Item>
            <Menu.ItemGroup className="select-cell-menu-group" key="Colors" title="Colors">
              {COLOR.map(colorMeta => (
                <Menu.Item
                  className={cx('select-cell-menu-color-item', { active: option.color === colorMeta.color })}
                  onClick={() => onOptionValueChange({ ...option, color: colorMeta.color })}
                  key={colorMeta.color}
                >
                  <span
                    className="select-cell-menu-color-icon-container"
                    style={{ color: colorMeta.color, background: bgColor(colorMeta.color) }}
                  >
                    <Icon.FontSize />
                  </span>
                  {colorMeta.label}
                  {option.color === colorMeta.color && <Icon.Check className="select-cell-menu-color-active-icon" />}
                </Menu.Item>
              ))}
            </Menu.ItemGroup>
          </Menu>
        }
        visible={visible}
        onVisibleChange={handleVisibleChange}
        placement="right"
      >
        <Button
          data-testid="table-select-cell-option-menu-button"
          className="select-cell-option-menu-button"
          type="text"
          onClick={handleOpenMenu}
        >
          <Icon.More className="select-cell-option-menu-icon" />
        </Button>
      </Popover>
    </div>
  )
}
