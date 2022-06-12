import { styled, theme } from '@brickdoc/design-system'

export const Warp = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: '1rem'
})

export const Label = styled('div', {
  label: {
    fontSize: theme.fontSizes.subHeadline,
    lineHeight: theme.lineHeights.subHeadline,
    color: theme.colors.typePrimary
  },
  '.desc': {
    color: theme.colors.typeSecondary,
    fontSize: theme.fontSizes.callout
  }
})

export const InviteLink = styled('div', {
  display: 'flex',
  width: '100%',
  marginBottom: '24px',
  '&>button': {
    marginLeft: '.5rem'
  }
})
