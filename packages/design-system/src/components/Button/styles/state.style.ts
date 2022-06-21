import { theme } from '../../../themes'

const circleBase = {
  padding: '0',
  borderRadius: '50%',
  justifyContent: 'center'
}

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
  loading: {
    true: {
      cursor: 'not-allowed'
    }
  },
  block: {
    true: {
      width: '100%',
      justifyContent: 'center'
    }
  },
  circle: {
    sm: {
      ...circleBase,
      width: theme.space.lg,
      height: theme.space.lg
    },
    md: {
      ...circleBase,
      width: theme.space.xxxl,
      height: theme.space.xxxl
    },
    lg: {
      ...circleBase,
      width: '32px',
      height: '32px'
    }
  },
  hasIcon: {
    true: {
      '.mc-icon+span, span+.mc-icon': {
        marginLeft: theme.space.xs
      }
    }
  }
}
