import React from 'react'
import { MenuProps, styled } from '@brickdoc/design-system'
import { BasicActionOptionType, useBasicActionOptions } from './useBasicActionOptions'
import {
  ToolbarSubMenuOption,
  ToolbarItemOption,
  ToolbarItemOptionGroup,
  ToolbarItemGroupOption,
  ToolbarOption,
  ToolbarOptionGroup,
  ToolbarGroupOption
} from '../Toolbar'
import { BlockActionButton } from './BlockActionButton'

export type ActionItemOption = ToolbarItemOption

export type ActionSubMenuOption = ToolbarSubMenuOption

export type ActionGroupOption = ToolbarGroupOption

export type ActionItemGroupOption = ToolbarItemGroupOption

export type ActionOption = ToolbarOption

export type ActionItemOptionGroup = ToolbarItemOptionGroup

export type ActionOptionGroup = ToolbarOptionGroup

export type BlockActionOptions = Array<ToolbarGroupOption | ToolbarItemOption | BasicActionOptionType>

export interface BlockActionsProps {
  baseId?: MenuProps['baseId']
  options: BlockActionOptions
  atListStart: boolean
}

const BlockActionButtonContainer = styled(BlockActionButton, {
  left: 0,
  opacity: 0,
  position: 'absolute',
  transform: 'translateX(calc(-100% - 0.6875rem))',
  transition: 'opacity 200ms ease-in-out',
  top: 0,
  variants: {
    atListStart: {
      true: {
        left: '-20px'
      },
      false: {
        left: 0
      }
    }
  }
})

const BlockActionsContainer = styled('div', {
  position: 'relative',
  '&:hover': {
    [`& ${BlockActionButtonContainer}`]: {
      opacity: 1
    }
  }
})

export const BlockActions: React.FC<BlockActionsProps> = ({ options, baseId, children, atListStart }) => {
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
    <BlockActionsContainer>
      {children}
      <BlockActionButtonContainer
        atListStart={atListStart}
        baseId={baseId}
        extraOptions={extraOptions}
        basicOptions={basicOptions}
      />
    </BlockActionsContainer>
  )
}
