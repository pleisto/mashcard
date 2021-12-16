import React from 'react'
import { useTreeState } from '@react-stately/tree'
import { useMenu } from '@react-aria/menu'
import { styled } from '../../themes'
import { Item, MenuItemProps } from './item'
import { Section } from './section'
import { SectionContainer } from './sectionContainer'
import { wrapInCollection } from './wrapInCollection'
import { ItemContainer } from './itemContainer'
import { Separator } from './separator'

export interface MenuProps {
  'aria-label'?: string
  className?: string
  onAction?: MenuItemProps['onAction']
}

const MenuRoot = styled('ul', {
  include: ['ceramicPrimary'],
  borderRadius: '4px',
  display: 'inline-block',
  margin: 0,
  listStyle: 'none',
  padding: 0
})

export const Menu: React.FC<MenuProps> & {
  Item: typeof Item
  Section: typeof Section
} = props => {
  // we must wrap items into Collection for useTreeState
  const children = [...React.Children.toArray(props.children)] as React.ReactElement[]
  const collection = wrapInCollection(children)
  const state = useTreeState<React.ReactElement>({ ...props, children: collection, selectionMode: 'none' })
  const ref = React.useRef<HTMLUListElement>()
  const { menuProps } = useMenu({ ...props, children }, state, ref)
  const { className } = props

  return (
    <MenuRoot {...menuProps} className={className} css={{}} ref={ref}>
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
  )
}

Menu.Item = Item
Menu.Section = Section
