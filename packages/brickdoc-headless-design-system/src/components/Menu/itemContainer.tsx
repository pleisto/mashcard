import React from 'react'
import { TreeState } from '@react-stately/tree'
import { Node } from '@react-types/shared'
import { MenuItemProps } from './item'

export interface ItemContainerProps {
  item: Node<React.ReactElement>
  state: TreeState<React.ReactElement>
  onAction: MenuItemProps['onAction']
}

export interface ItemContextProps extends ItemContainerProps {}

export const ItemContext = React.createContext<ItemContextProps>(null)

export const ItemContainer: React.FC<ItemContainerProps> = ({ item, state, onAction }) => {
  const contextValue = React.useMemo<ItemContextProps>(
    () => ({
      item,
      state,
      onAction
    }),
    [item, onAction, state]
  )

  return <ItemContext.Provider value={contextValue}>{item.rendered}</ItemContext.Provider>
}
