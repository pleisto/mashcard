import React from 'react'
import { Popover } from '@brickdoc/design-system'
import { BlockActionsMenu } from './BlockActionsMenu'
import './BlockActions.less'

export interface ActionDropdownMenuItem {
  type: 'item'
  onClick?: (closeMenu: () => void) => void
  Icon?: React.ReactElement
  content?: React.ReactElement
  name: string
  active?: boolean
}

export interface ActionDropdownMenuDivider {
  type: 'divider'
}

export interface ActionOptionBase {
  type: 'button' | 'dropdown'
  active?: boolean
  Icon: React.ReactElement
  onClick?: () => void
}

export interface ActionButtonOption extends ActionOptionBase {
  type: 'button'
}

export interface ActionDropdownOption extends ActionOptionBase {
  type: 'dropdown'
  dropdownType?: 'dropdown' | 'popover'
  menuItems: Array<ActionDropdownMenuItem | ActionDropdownMenuDivider>
}

export type ActionOption = ActionButtonOption | ActionDropdownOption

export type ActionOptionGroup = Array<ActionOption[] | ActionOption>

export interface BlockActionsProps {
  options: ActionOptionGroup
}

export const BlockActions: React.FC<BlockActionsProps> = ({ options, children }) => {
  return (
    <Popover
      overlayClassName="brickdoc-action-panel-popover"
      trigger="hover"
      autoAdjustOverflow={false}
      placement="topRight"
      content={<BlockActionsMenu options={options} />}
    >
      {children}
    </Popover>
  )
}
