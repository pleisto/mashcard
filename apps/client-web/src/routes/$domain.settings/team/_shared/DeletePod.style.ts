import { styled, theme } from '@mashcard/design-system'

export const Warp = styled('div', {
  paddingBottom: 24
})

export const Desc = styled('p', {
  fontSize: theme.fontSizes.callout,
  lineHeight: theme.lineHeights.callout,
  color: theme.colors.typeSecondary,
  marginBottom: 24
})

export const ModalDesc = styled('p', {
  fontSize: theme.fontSizes.body,
  lineHeight: theme.lineHeights.body,
  color: theme.colors.typeSecondary,
  margin: 0
})

export const ModalBtnGroup = styled('div', {
  display: 'grid',
  gridColumnGap: '8px',
  gridTemplateColumns: '1fr 1fr'
})
