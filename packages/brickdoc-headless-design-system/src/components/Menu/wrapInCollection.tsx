import React from 'react'
import { Section, Item } from '@react-stately/collections'

export const wrapInCollection = (elements: React.ReactElement[]): React.ReactElement[] => {
  return elements
    .map(element => {
      if ((element.type as Function)?.name === 'Section') {
        return (
          <Section
            title={element.props.title}
            // eslint-disable-next-line react/no-children-prop
            children={wrapInCollection(element.props.children)}
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
