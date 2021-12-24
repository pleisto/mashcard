import React from 'react'
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
  fontSize: theme.fontSizes.subHeadline,
  fontWeight: 500,
  minHeight: itemMinHeight,
  padding: `0 ${itemSpacing}`
})

const SectionList = styled('ul', {
  listStyle: 'none',
  padding: 0
})

export const Section: React.FC<MenuSectionProps> = ({ title, children }) => {
  return (
    <li role="presentation">
      {title && <SectionHeading css={{}}>{title}</SectionHeading>}
      <SectionList role="group" css={{}}>
        {children}
      </SectionList>
    </li>
  )
}
