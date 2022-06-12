import { styled, theme } from '@brickdoc/design-system'

export const Box = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  '& label': {
    fontWeight: 500,
    fontSize: theme.fontSizes.subHeadline,
    lineHeight: theme.lineHeights.subHeadline
  }
})

export const BoxLeft = styled('div', {
  display: 'flex',
  width: '20rem',
  flexDirection: 'column'
})

export const BoxRight = styled('div', {
  display: 'flex',
  width: '20rem',
  flexDirection: 'column',
  '& label': {
    width: 100
  },
  '& div': {
    alignItems: 'flex-end'
  }
})
