import React from 'react'
import { TreeState } from '@react-stately/tree'
import { Node } from '@react-types/shared'
import { MenuItemProps } from './item'
import { Section } from './section'

export interface SectionContainerProps {
  section: Node<React.ReactElement>
  state: TreeState<React.ReactElement>
  onAction: MenuItemProps['onAction']
}

export interface SectionContextProps extends SectionContainerProps {}

export const SectionContext = React.createContext<SectionContextProps>(null)

export const SectionContainer: React.FC<SectionContainerProps> = ({ section, state, onAction }) => {
  const contextValue = React.useMemo<SectionContextProps>(
    () => ({
      section,
      state,
      onAction
    }),
    [section, onAction, state]
  )

  return (
    <SectionContext.Provider value={contextValue}>
      <Section />
    </SectionContext.Provider>
  )
}
