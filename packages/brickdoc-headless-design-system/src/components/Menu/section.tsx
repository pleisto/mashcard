import React from 'react'
import { useMenuSection } from '@react-aria/menu'
import { SectionContext } from './sectionContainer'
import { ItemContainer } from './itemContainer'
import { styled, theme } from '../../themes'
import { itemMinHeight, itemSpacing } from './styles/index.style'

export interface MenuSectionProps {
  title?: string
}

const SectionHeading = styled('span', {
  alignItems: 'center',
  color: theme.colors.typeSecondary,
  display: 'flex',
  flexDirection: 'row',
  fontWeight: 600,
  minHeight: itemMinHeight,
  padding: `0 ${itemSpacing}`
})

const SectionList = styled('ul', {
  listStyle: 'none',
  padding: 0
})

export const Section: React.FC<MenuSectionProps> = () => {
  const context = React.useContext(SectionContext)

  const { section, state, onAction } = context
  const { itemProps, headingProps, groupProps } = useMenuSection({
    heading: section.rendered,
    'aria-label': section['aria-label']
  })

  return (
    <li {...itemProps}>
      {section.rendered && (
        <SectionHeading {...headingProps} css={{}}>
          {section.rendered}
        </SectionHeading>
      )}
      <SectionList {...groupProps} css={{}}>
        {[...section.childNodes].map(node => (
          <ItemContainer key={node.key} item={node} state={state} onAction={onAction} />
        ))}
      </SectionList>
    </li>
  )
}
