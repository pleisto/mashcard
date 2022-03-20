import { ReactNode, useContext } from 'react'
import { CSS } from '@stitches/react'
import { styled, theme, Tooltip } from '@brickdoc/design-system'
import { ToolbarMenuItem } from './MenuItem'
import { ToolbarMenuSubMenuItem } from './MenuSubMenuItem'
import { EditorContext } from '../../../context/EditorContext'

export interface ToolbarOptionBase {
  type: 'item' | 'subMenu'
  name: string
  css?: CSS
  icon?: React.ReactElement
  label?: string
  content?: React.ReactNode
  onAction?: (key: React.Key) => void
  active?: boolean
  closeOnAction?: boolean
  tip?: React.ReactElement
  tooltip?:
    | boolean
    | string
    | {
        title: string
        description: string
      }
}

export interface ToolbarItemOption extends ToolbarOptionBase {
  type: 'item'
}

export interface ToolbarGroupOption {
  type: 'group'
  title?: string
  items: ToolbarOption[]
}

export interface ToolbarItemGroupOption {
  type: 'group'
  title?: string
  items: ToolbarItemOption[]
}

export type ToolbarSubMenuItemsRender = () => React.ReactNode

export interface ToolbarSubMenuOption extends ToolbarOptionBase {
  [x: string]: ReactNode
  type: 'subMenu'
  baseId?: string
  items: Array<ToolbarItemGroupOption | ToolbarItemOption> | ToolbarSubMenuItemsRender
}

export type ToolbarOption = ToolbarItemOption | ToolbarSubMenuOption

export type ToolbarItemOptionGroup = Array<ToolbarItemGroupOption | ToolbarItemOption>

export type ToolbarOptionGroup = Array<ToolbarGroupOption | ToolbarOption>

export interface ToolbarProps {
  options: ToolbarOptionGroup
}

const ToolbarMenu = styled('ul', {
  include: ['ceramicPrimary', 'flexCenter'],
  borderBottomLeftRadius: '8px',
  borderBottomRightRadius: '4px',
  borderTopLeftRadius: '4px',
  borderTopRightRadius: '8px',
  display: 'flex',
  flexDirection: 'row',
  listStyle: 'none',
  margin: 0,
  padding: '.375rem .5rem',
  'li + li': {
    marginLeft: '2px'
  }
})

const ToolbarMenuGroup = styled('ul', {
  include: ['flexCenter'],
  display: 'flex',
  flexDirection: 'row',
  listStyle: 'none',
  margin: 0,
  padding: 0
})

const ToolbarSeparator = styled('li', {
  background: theme.colors.dividerOverlayPrimary,
  height: '1rem',
  margin: '2px 4px',
  width: '1px'
})

const ToolbarMenuOptionInner: React.FC<{ option: ToolbarOption }> = ({ option, ...props }) => {
  if (option.type === 'item') {
    return <ToolbarMenuItem option={option} {...props} />
  }

  return <ToolbarMenuSubMenuItem option={option} {...props} />
}

const ToolbarMenuOption: React.FC<{ option: ToolbarOption }> = ({ option }) => {
  if (!option.tooltip) {
    return <ToolbarMenuOptionInner option={option} />
  }

  let tooltipTitle = ''
  let tooltipDescription = ''

  if (option.tooltip === true) {
    tooltipTitle = option.label ?? option.name
  } else if (typeof option.tooltip === 'string') {
    tooltipTitle = option.tooltip
  } else {
    tooltipTitle = option.tooltip.title
    tooltipDescription = option.tooltip.description
  }

  return (
    <Tooltip
      getPopupContainer={element => element}
      title={
        <>
          <div>{tooltipTitle}</div>
          <div>{tooltipDescription}</div>
        </>
      }
      placement="top"
    >
      <ToolbarMenuOptionInner option={option} />
    </Tooltip>
  )
}

// TODO: implement by menu
export const Toolbar: React.FC<ToolbarProps> = ({ options }) => {
  const { t } = useContext(EditorContext)
  return (
    <ToolbarMenu role="menu">
      {options?.reduce<React.ReactElement[]>((elements, option, index, array) => {
        if (option.type === 'group')
          return [
            ...elements,
            <ToolbarMenuGroup role="presentation" title={option.title} key={option.title ?? `section-${index}`}>
              {option.items.map((option, optionIndex) => (
                <ToolbarMenuOption key={`${index}-${optionIndex}`} option={option} />
              ))}
              {index < array.length - 1 && <ToolbarSeparator aria-label={t('toolbar.separator')} />}
            </ToolbarMenuGroup>
          ]

        return [...elements, <ToolbarMenuOption key={option.name} option={option} />]
      }, [])}
    </ToolbarMenu>
  )
}
