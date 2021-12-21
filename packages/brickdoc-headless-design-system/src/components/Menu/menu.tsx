import React from 'react'
import { PressEvents } from '@react-types/shared'
import { mergeProps } from '@react-aria/utils'
import { useTreeState } from '@react-stately/tree'
import { useMenu } from '@react-aria/menu'
import { styled, theme } from '../../themes'
import { Item, MenuItemProps } from './item'
import { Section } from './section'
import { SectionContainer } from './sectionContainer'
import { wrapInCollection } from './wrapInCollection'
import { ItemContainer } from './itemContainer'
import { Separator } from './separator'
import { usePress } from '@react-aria/interactions'
import { itemSpacing } from './styles/index.style'

export interface MenuProps extends PressEvents {
  'aria-label'?: string
  className?: string
  searchable?: boolean
  onAction?: MenuItemProps['onAction']
}

const Root = styled('div', {
  include: ['ceramicPrimary'],
  borderRadius: '4px',
  display: 'flex',
  flexDirection: 'column'
})

const SearchInput = styled('input', {
  background: theme.colors.ceramicQuaternary,
  border: `1px solid ${theme.colors.borderPrimary}`,
  borderRadius: '4px',
  fontSize: theme.fontSizes.subHeadline,
  fontWeight: 500,
  lineHeight: '1.25rem',
  margin: `${itemSpacing}`,
  height: '28px',
  outline: 'none',
  '&::placeholder': {
    color: theme.colors.typeThirdary
  }
})

const MenuRoot = styled('ul', {
  display: 'inline-block',
  margin: 0,
  listStyle: 'none',
  padding: 0
})

export const Menu: React.FC<MenuProps> & {
  Item: typeof Item
  Section: typeof Section
} = props => {
  const [searchValue, setSearchValue] = React.useState('')
  // we must wrap items into Collection for useTreeState
  const children = [...React.Children.toArray(props.children)] as React.ReactElement[]
  const collection = wrapInCollection(children, searchValue)
  const state = useTreeState<React.ReactElement>({ ...props, children: collection, selectionMode: 'none' })
  const ref = React.useRef<HTMLUListElement>()
  const { menuProps } = useMenu({ ...props, children }, state, ref)
  const { pressProps } = usePress({})
  const { className, searchable } = props
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchValue(event.target.value)
  }

  return (
    <Root>
      {searchable && <SearchInput value={searchValue} onChange={handleSearchChange} placeholder="Search" />}
      <MenuRoot {...mergeProps(menuProps, pressProps)} className={className} css={{}} ref={ref}>
        {[...state.collection].map((item, index, list) => {
          if (item.type === 'section')
            return (
              <React.Fragment key={item.key}>
                <SectionContainer section={item} state={state} onAction={props.onAction} />
                {item.index !== list.length - 1 && <Separator />}
              </React.Fragment>
            )
          if (item.type === 'item')
            return <ItemContainer key={item.key} item={item} state={state} onAction={props.onAction} />
          return null
        })}
      </MenuRoot>
    </Root>
  )
}

Menu.Item = Item
Menu.Section = Section
