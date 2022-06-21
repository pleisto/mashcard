import { styled, theme } from '@mashcard/design-system'

export const PanelWrapper = styled('div', {
  marginBottom: '2rem',
  '&>h2': {
    fontSize: theme.fontSizes.title3,
    fontWeight: 600,
    color: theme.colors.typePrimary,
    lineHeight: theme.lineHeights.title3,
    paddingBottom: '2rem',
    margin: 0
  },
  '& .body': {
    flexDirection: 'column',
    paddingBottom: '.5rem',
    borderBottom: `1px solid ${theme.colors.overlaySecondary}`
  }
})
