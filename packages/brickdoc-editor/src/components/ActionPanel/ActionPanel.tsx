import React from 'react'
import { Popover } from '@brickdoc/design-system'
import { ActionPanelInner } from './ActionPanelInner'
import './ActionPanel.less'

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

export interface ActionPanelProps {
  options: ActionOptionGroup
}

export const ActionPanel: React.FC<ActionPanelProps> = ({ options, children }) => {
  return (
    <Popover
      overlayClassName="brickdoc-action-panel-popover"
      trigger="hover"
      placement="top"
      content={<ActionPanelInner options={options} />}>
      {children}
    </Popover>
  )
}
