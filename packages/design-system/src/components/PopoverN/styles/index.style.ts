import { theme, styled } from '../../../themes'

export const PopoverWrapper = styled('div', {
  position: 'relative',
  display: 'inline'
})

export const ChildWrapper = styled('button', {
  position: 'relative',
  border: 'none',
  background: 'transparent',
  padding: 0
})

export const ContentWrapper = styled('div', {
  include: ['ceramicPrimary', 'refractionPrimary', 'cornerFix'],
  backgroundColor: theme.colors.white,
  backgroundClip: 'padding-box',
  color: theme.colors.typePrimary,
  padding: '10px 12px',
  minHeight: '2rem',
  borderRadius: '4px',
  minWidth: '10rem',
  // The outline here should appear internally
  outline: `0.2px solid ${theme.colors.white}`,
  outlineOffset: '-0.2px'
})
