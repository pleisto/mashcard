import React from 'react'
import { Popover } from '@brickdoc/design-system'
import { BlockActionsMenu } from './BlockActionsMenu'
import './BlockActions.less'
import { BasicActionOptionType, useBasicActionOptions } from './useBasicActionOptions'
import {
  ToolbarDropdownOption,
  ToolbarItemOption,
  ToolbarItemOptionGroup,
  ToolbarItemSectionOption,
  ToolbarOption,
  ToolbarOptionGroup,
  ToolbarSectionOption
} from '../Toolbar'

export type ActionItemOption = ToolbarItemOption

export type ActionDropdownOption = ToolbarDropdownOption

export type ActionSectionOption = ToolbarSectionOption

export type ActionItemSectionOption = ToolbarItemSectionOption

export type ActionOption = ToolbarOption

export type ActionItemOptionGroup = ToolbarItemOptionGroup

export type ActionOptionGroup = ToolbarOptionGroup

export type BlockActionOptions = Array<ToolbarSectionOption | ToolbarItemOption | BasicActionOptionType>

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
      autoAdjustOverflow={false}
      placement="topRight"
      content={<BlockActionsMenu extraOptions={extraOptions} basicOptions={basicOptions} />}
    >
      {children}
    </Popover>
  )
}
