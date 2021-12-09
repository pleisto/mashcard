export const state = {
  disabledBtn: {
    true: {
      cursor: 'not-allowed',
      backgroundColor: '$color-background-primary',
      color: '$color-type-disable',
      border: '1px solid $color-border-primary',
      '&:hover, &:focus, &:active': {
        backgroundColor: '$color-background-primary',
        color: '$color-type-disable',
        border: '1px solid $color-border-primary'
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
      padding: '$sm',
      textAlign: 'center',
      borderRadius: '50%',
      minWidth: '$lg'
    },
    medium: {
      padding: '$xs',
      textAlign: 'center',
      borderRadius: '50%',
      minWidth: '$3xl'
    },
    large: {
      padding: '$sm',
      textAlign: 'center',
      borderRadius: '50%',
      minWidth: '$4xl'
    }
  },
  hasIcon: {
    true: {
      '.brk-icon+span, span+.brk-icon': {
        marginLeft: '$xs'
      }
    }
  }
}
