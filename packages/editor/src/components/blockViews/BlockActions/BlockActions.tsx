import { FC, ReactNode, useMemo, useState } from 'react'
import { MenuProps, styled, theme } from '@mashcard/design-system'
import { BasicActionOptionType, useBasicActionOptions } from './useBasicActionOptions'
import {
  ToolbarSubMenuOption,
  ToolbarItemOption,
  ToolbarItemOptionGroup,
  ToolbarItemGroupOption,
  ToolbarOption,
  ToolbarOptionGroup,
  ToolbarGroupOption
} from '../../ui'
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
  buttonClassName?: string
  baseId?: MenuProps['baseId']
  options?: BlockActionOptions
  children?: ReactNode
}

const BlockActionButtonContainer = styled(BlockActionButton, {
  include: ['flexCenter'],
  display: 'flex',
  left: 0,
  height: theme.lineHeights.body,
  opacity: 0,
  position: 'absolute',
  transform: 'translateX(calc(-100% - 0.6875rem))',
  transition: 'opacity 200ms ease-in-out',
  top: 0,
  '&::before': {
    content: '',
    position: 'absolute',
    height: '100%',
    width: 45,
    top: '100%',
    left: -20,
    display: 'block'
  }
})

const BlockActionsContainer = styled('div', {
  position: 'relative',
  '&:hover, &.hover': {
    [`& ${BlockActionButtonContainer}`]: {
      opacity: 1
    }
  },
  variants: {
    disabled: {
      true: {
        [`& ${BlockActionButtonContainer}`]: {
          display: 'none',
          opacity: 0,
          pointerEvents: 'none'
        },
        '&:hover': {
          [`& ${BlockActionButtonContainer}`]: {
            opacity: 0
          }
        }
      }
    }
  }
})

export const BlockActions: FC<BlockActionsProps> = ({ options, buttonClassName, baseId, children }) => {
  const [visible, setVisible] = useState(false)
  const basicOptionTypes = useMemo<BasicActionOptionType[]>(
    () => (options?.filter(option => typeof option === 'string') as BasicActionOptionType[]) ?? [],
    [options]
  )
  const extraOptions = useMemo<ActionOptionGroup>(
    () => (options?.filter(option => typeof option !== 'string') as ActionOptionGroup) ?? [],
    [options]
  )
  const basicOptions = useBasicActionOptions({ types: basicOptionTypes })

  return (
    <BlockActionsContainer className={visible ? 'hover' : ''} disabled={!options || options.length === 0}>
      {children}
      <BlockActionButtonContainer
        onMenuVisibleChange={setVisible}
        className={buttonClassName}
        baseId={baseId}
        extraOptions={extraOptions}
        basicOptions={basicOptions}
      />
    </BlockActionsContainer>
  )
}
