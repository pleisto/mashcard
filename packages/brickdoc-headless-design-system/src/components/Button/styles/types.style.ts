import { theme } from '../../../themes'

export const type = {
  primary: {
    backgroundColor: theme.colors.primaryDefault,
    color: theme.colors.white,

    '&:hover, &:focus, &:active': {
      textDecoration: 'none',
      backgroundColor: theme.colors.primaryHover
    }
  },
  'primary-press': {
    backgroundColor: theme.colors.primaryPressed,
    color: theme.colors.white
  },

  secondary: {
    backgroundColor: theme.colors.white,
    border: `1px solid ${theme.colors.borderSecondary}`,
    color: theme.colors.typePrimary,
    '&:hover, &:focus, &:active': {
      textDecoration: 'none',
      backgroundColor: theme.colors.backgroundSecondary
    },
    '&-press': {}
  },
  'secondary-press': {
    backgroundColor: theme.colors.grey3,
    color: theme.colors.typePrimary
  },

  text: {
    backgroundColor: 'transparent',
    color: theme.colors.typePrimary,
    '&:hover, &:focus, &:active': {
      textDecoration: 'none',
      backgroundColor: theme.colors.backgroundPrimary
    }
  },
  'text-press': {
    backgroundColor: theme.colors.grey3,
    color: theme.colors.typePrimary
  },

  danger: {
    backgroundColor: theme.colors.errorDefault,
    color: theme.colors.white,
    '&:hover, &:focus, &:active': {
      textDecoration: 'none',
      backgroundColor: theme.colors.errorHover
    }
  },
  'danger-press': {
    backgroundColor: theme.colors.errorPressed,
    color: theme.colors.white
  }
}
