import { styled, theme } from '@brickdoc/design-system'

export const Warp = styled('div', {
  '& label': {
    fontWeight: 500,
    fontSize: theme.fontSizes.subHeadline,
    lineHeight: theme.lineHeights.subHeadline
  },
  '&>form>div': {
    marginBottom: 8,
    width: '20rem'
  },
  button: {
    marginBottom: '1.5rem'
  }
})

export const Desc = styled('p', {
  color: theme.colors.typeSecondary,
  fontSize: theme.fontSizes.callout,
  lineHeight: theme.lineHeights.callout,
  marginBottom: '1.5rem',
  a: {
    color: theme.colors.primaryDefault
  }
})
