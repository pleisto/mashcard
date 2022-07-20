import { theme, styled, css } from '@mashcard/design-system'

export const Item = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  '.anyone-icon': {
    height: '2rem',
    width: '2rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: theme.colors.ceramicSecondary,
    border: '1px solid',
    borderColor: theme.colors.borderSecondary,
    borderRadius: '100%'
  }
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
    padding: '0 1rem',
    flex: 1
  },

  '.head': {
    lineHeight: theme.lineHeights.subHeadline,
    fontSize: theme.fontSizes.subHeadline
  },

  '.desc': {
    lineHeight: theme.lineHeights.callout,
    fontSize: theme.fontSizes.callout
  },

  '.check-icon': {
    marginRight: '1rem',
    color: theme.colors.primaryDefault
  }
})
