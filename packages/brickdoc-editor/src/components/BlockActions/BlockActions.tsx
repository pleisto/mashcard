import React from 'react'
import { Popover } from '@brickdoc/design-system'
import { BlockActionsMenu } from './BlockActionsMenu'
import './BlockActions.less'
import { BasicActionOptionType, useBasicActionOptions } from './useBasicActionOptions'
import {
  ToolbarDropdownOption,
  ToolbarItemOption,
  ToolbarItemOptionGroup,
  ToolbarItemGroupOption,
  ToolbarOption,
  ToolbarOptionGroup,
  ToolbarGroupOption
} from '../Toolbar'

export type ActionItemOption = ToolbarItemOption

export type ActionDropdownOption = ToolbarDropdownOption

export type ActionGroupOption = ToolbarGroupOption

export type ActionItemGroupOption = ToolbarItemGroupOption

export type ActionOption = ToolbarOption

export type ActionItemOptionGroup = ToolbarItemOptionGroup

export type ActionOptionGroup = ToolbarOptionGroup

export type BlockActionOptions = Array<ToolbarGroupOption | ToolbarItemOption | BasicActionOptionType>

export interface BlockActionsProps {
  options: BlockActionOptions
}

export const BlockActions: React.FC<BlockActionsProps> = ({ options, children }) => {
  const basicOptionTypes = React.useMemo<BasicActionOptionType[]>(
    () => options.filter(option => typeof option === 'string') as BasicActionOptionType[],
    [options]
  )
  const extraOptions = React.useMemo<ActionOptionGroup>(
    () => options.filter(option => typeof option !== 'string') as ActionOptionGroup,
    [options]
  )
  const basicOptions = useBasicActionOptions({ types: basicOptionTypes })

  return (
    <Popover
      // TODO: replace by css-in-js
      overlayClassName="brickdoc-action-panel-popover"
      trigger="hover"
      autoAdjustOverflow={true}
      placement="topEnd"
      content={<BlockActionsMenu extraOptions={extraOptions} basicOptions={basicOptions} />}
    >
      {children}
    </Popover>
  )
}
