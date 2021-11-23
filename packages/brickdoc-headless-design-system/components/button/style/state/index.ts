export const state = {
  disabledBtn: {
    true: {
      cursor: 'not-allowed',
      backgroundColor: '$color-background-primary',
      color: '$color-type-disable',
      border: '1px solid $color-broder-primary',
      '&:hover, &:focus, &:active': {
        backgroundColor: '$color-background-primary',
        color: '$color-type-disable',
        border: '1px solid $color-broder-primary'
      }
    }
  },
  block: {
    true: {
      width: '100%'
    }
  },
  circle: {
    sm: {
      padding: '$sm',
      textAlign: 'center',
      borderRadius: '50%',
      minWidth: '$lg'
    },
    md: {
      padding: '$xs',
      textAlign: 'center',
      borderRadius: '50%',
      minWidth: '$3xl'
    },
    lg: {
      padding: '$sm',
      textAlign: 'center',
      borderRadius: '50%',
      minWidth: '$4xl'
    }
  }
}
