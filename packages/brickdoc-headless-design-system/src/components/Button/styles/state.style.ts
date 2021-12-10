import { theme } from '../../../themes'

export const state = {
  disabledBtn: {
    true: {
      cursor: 'not-allowed',
      backgroundColor: theme.colors.backgroundPrimary,
      color: theme.colors.typeDisabled,
      border: `1px solid ${theme.colors.borderPrimary}`,
      '&:hover, &:focus, &:active': {
        backgroundColor: theme.colors.backgroundPrimary,
        color: theme.colors.typeDisabled,
        border: `1px solid ${theme.colors.borderPrimary}`
      }
    }
  },
  block: {
    true: {
      width: '100%',
      justifyContent: 'center'
    }
  },
  circle: {
    small: {
      padding: theme.space.sm,
      textAlign: 'center',
      borderRadius: '50%',
      minWidth: theme.space.lg
    },
    medium: {
      padding: theme.space.xs,
      textAlign: 'center',
      borderRadius: '50%',
      minWidth: theme.space.xxxl
    },
    large: {
      padding: theme.space.sm,
      textAlign: 'center',
      borderRadius: '50%',
      minWidth: theme.space._4xl
    }
  },
  hasIcon: {
    true: {
      '.brk-icon+span, span+.brk-icon': {
        marginLeft: theme.space.xs
      }
    }
  }
}
