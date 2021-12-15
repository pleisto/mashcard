import { theme, css } from '../../../themes'

export const root = css({
  include: ['flexCenter'],
  flexWrap: 'wrap',
  display: 'inline-flex',
  position: 'relative',
  isolation: 'isolation'
})

export const switcher = css({
  background: theme.colors.deepPurple2,
  borderRadius: '100px',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  paddingLeft: '2px',
  '&>div': {
    transition: `all .2s ${theme.transitions.easeInOutQuint}`,
    transform: 'translateX(0)',
    background: theme.colors.ceramicQuaternary,
    borderRadius: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxSize: '1em'
  },
  variants: {
    checked: {
      true: {
        borderColor: theme.colors.primaryDefault,
        background: theme.colors.primaryDefault,
        '&>div': {
          background: theme.colors.white
        }
      }
    },
    loading: {
      true: {
        '.brd-icon': {
          color: theme.colors.typeDisabled,
          fontSize: '.75em'
        }
      }
    },
    size: {
      small: {
        width: '26px',
        height: '16px',
        '& + span, span + &': {
          marginLeft: '8px'
        },
        '&>div': {
          fontSize: '12px'
        }
      },
      medium: {
        width: '30px',
        height: '18px',
        '& + span, span + &': {
          marginLeft: '10px'
        },
        '&>div': {
          fontSize: '14px'
        }
      },
      large: {
        width: '32px',
        height: '20px',
        '& + span, span + &': {
          marginLeft: '12px'
        },
        '&>div': {
          fontSize: '16px'
        }
      }
    },
    disabled: {
      true: {
        cursor: 'not-allowed'
      }
    }
  },
  compoundVariants: [
    {
      disabled: true,
      checked: false,
      css: {
        background: theme.colors.typeDisabled,
        '&>div': {
          background: theme.colors.typeThirdary
        }
      }
    },
    {
      disabled: true,
      checked: true,
      css: {
        background: theme.colors.primaryDisable,
        borderColor: theme.colors.primaryDisable,
        '&>div': {
          background: theme.colors.primaryDefault
        }
      }
    },
    {
      checked: true,
      size: 'small',
      css: {
        '&>div': {
          transform: 'translateX(10px)'
        }
      }
    },
    {
      checked: true,
      size: 'medium',
      css: {
        '&>div': {
          transform: 'translateX(12px)'
        }
      }
    },
    {
      checked: true,
      size: 'large',
      css: {
        '&>div': {
          transform: 'translateX(12px)'
        }
      }
    }
  ]
})
