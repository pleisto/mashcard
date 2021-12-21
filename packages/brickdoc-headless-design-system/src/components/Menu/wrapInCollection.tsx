import React from 'react'
import { Section, Item } from '@react-stately/collections'

export const wrapInCollection = (
  elements: React.ReactElement[],
  searchValue: string | undefined
): React.ReactElement[] => {
  return elements
    .filter(
      element =>
        (element.type as Function)?.name === 'Section' ||
        element.key.toString().toLowerCase().includes(searchValue?.toLowerCase())
    )
    .map(element => {
      if ((element.type as Function)?.name === 'Section') {
        const children = wrapInCollection(element.props.children, searchValue)
        if (children.length === 0) return null

        return (
          <Section
            title={element.props.title}
            // eslint-disable-next-line react/no-children-prop
            children={children}
            key={element.key}
          />
        )
      }

      if ((element.type as Function)?.name === 'Item') {
        return (
          // eslint-disable-next-line react/no-children-prop
          <Item children={element} key={element.key} textValue={element.key?.toString()} />
        )
      }

      return null
    })
    .filter(e => !!e)
}
