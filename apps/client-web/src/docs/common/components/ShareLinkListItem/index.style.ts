import { theme, styled, css } from '@brickdoc/design-system'

export const Item = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
})

export const Action = styled('div', {
  fontSize: theme.fontSizes.callout,
  lineHeight: theme.lineHeights.callout,
  color: theme.colors.typeSecondary,
  cursor: 'pointer'
})

export const menu = css({
  width: 310,
  height: 60,
  padding: '0!important',

  '.content': {
    display: 'flex',
    flexFlow: 'column nowrap',
    padding: '0 1rem'
  },

  '.head': {
    lineHeight: theme.lineHeights.subHeadline,
    fontSize: theme.fontSizes.subHeadline
  },

  '.desc': {
    lineHeight: theme.lineHeights.callout,
    fontSize: theme.fontSizes.callout
  }
})
