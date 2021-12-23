import React from 'react'
import { styled, theme } from '@brickdoc/design-system'
import { ToolbarMenuItem } from './MenuItem'
import { ToolbarMenuDropdownItem } from './MenuDropdownItem'
import { EditorContext } from '../../context/EditorContext'

export interface ToolbarOptionBase {
  type: 'item' | 'dropdown'
  name: string
  icon?: React.ReactElement
  content?: React.ReactNode
  onAction?: (key: React.Key) => void
  active?: boolean
  closeOnAction?: boolean
}

export interface ToolbarItemOption extends ToolbarOptionBase {
  type: 'item'
  label?: string
}

export interface ToolbarDropdownOption extends ToolbarOptionBase {
  type: 'dropdown'
  searchable?: boolean
  menuItems: ToolbarItemOptionGroup
}

export type ToolbarOption = ToolbarItemOption | ToolbarDropdownOption

export type ToolbarItemOptionGroup = Array<ToolbarItemOption[] | ToolbarItemOption>

export type ToolbarOptionGroup = Array<ToolbarOption[] | ToolbarOption>

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

const ToolbarMenuSection = styled('ul', {
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

const ToolbarMenuOption: React.FC<{ option: ToolbarOption }> = ({ option }) => {
  if (option.type === 'item') {
    return <ToolbarMenuItem option={option} />
  }

  return <ToolbarMenuDropdownItem option={option} />
}

// TODO: implement @react-aria/menu
export const Toolbar: React.FC<ToolbarProps> = ({ options }) => {
  const { t } = React.useContext(EditorContext)
  return (
    <ToolbarMenu>
      {options?.reduce<React.ReactElement[]>((elements, option, index, array) => {
        if (Array.isArray(option))
          return [
            ...elements,
            <ToolbarMenuSection key={`section-${index}`}>
              {option.map((option, optionIndex) => (
                <ToolbarMenuOption key={`${index}-${optionIndex}`} option={option} />
              ))}
              {index < array.length - 1 && <ToolbarSeparator aria-label={t('toolbar.separator')} />}
            </ToolbarMenuSection>
          ]

        return [...elements, <ToolbarMenuOption key={option.name} option={option} />]
      }, [])}
    </ToolbarMenu>
  )
}
