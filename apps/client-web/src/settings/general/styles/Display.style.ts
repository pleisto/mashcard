import { styled, theme } from '@mashcard/design-system'

export const Warp = styled('div', {
  width: '20rem',
  '& label': {
    fontWeight: 500,
    fontSize: theme.fontSizes.subHeadline,
    lineHeight: theme.lineHeights.subHeadline
  }
})
