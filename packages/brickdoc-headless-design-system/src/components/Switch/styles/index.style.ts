import { motion } from 'framer-motion'
import { theme, css, styled } from '../../../themes'

export const root = css({
  include: ['flexCenter'],
  flexWrap: 'wrap',
  display: 'inline-flex',
  position: 'relative',
  isolation: 'isolation'
})

export const switcherHandle = styled(motion.div, {
  transform: 'translateX(0)',
  background: theme.colors.ceramicQuaternary,
  borderRadius: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  boxSize: '1em'
})

export const switcher = css({
  background: theme.colors.deepPurple2,
  borderRadius: '100px',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  paddingLeft: '2px',
  transitionProperty: 'all',
  transition: `all .2s ${theme.transitions.easeOut}`,
  variants: {
    checked: {
      true: {
        borderColor: theme.colors.primaryDefault,
        background: theme.colors.primaryDefault,
        [`${switcherHandle}`]: {
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
        [`${switcherHandle}`]: {
          fontSize: '12px'
        }
      },
      medium: {
        width: '30px',
        height: '18px',
        '& + span, span + &': {
          marginLeft: '10px'
        },
        [`${switcherHandle}`]: {
          fontSize: '14px'
        }
      },
      large: {
        width: '32px',
        height: '20px',
        '& + span, span + &': {
          marginLeft: '12px'
        },
        [`${switcherHandle}`]: {
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
        [`${switcherHandle}`]: {
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
        [`${switcherHandle}`]: {
          background: theme.colors.primaryDefault
        }
      }
    }
  ]
})
