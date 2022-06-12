import { theme, css } from '../../../themes'

export const root = css({
  include: ['flexCenter'],
  flexWrap: 'wrap',
  display: 'inline-flex',
  position: 'relative',
  isolation: 'isolation',
  borderRadius: '3px'
})

export const checkbox = css({
  width: '1em',
  height: '1em',
  fontSize: '1em',
  appearance: 'none',
  borderRadius: '3px',
  border: `1px solid ${theme.colors.iconThirdary}`,
  color: theme.colors.white,
  display: 'flex',
  include: ['flexCenter'],
  cursor: 'pointer',
  variants: {
    labelFirst: {
      true: {
        marginLeft: '10px'
      },
      false: {
        marginRight: '10px'
      }
    },
    noLabel: {
      true: {
        margin: 0
      }
    },
    checked: {
      true: {
        backgroundColor: theme.colors.primaryDefault,
        borderColor: theme.colors.primaryDefault
      },
      false: {}
    },
    disabled: {
      true: {
        cursor: 'not-allowed'
      },
      false: {
        '&:hover': {
          borderColor: theme.colors.primaryHover
        }
      }
    }
  },
  compoundVariants: [
    {
      checked: true,
      disabled: true,
      css: {
        backgroundColor: theme.colors.primaryDisable,
        borderColor: theme.colors.primaryDisable
      }
    },
    {
      checked: false,
      disabled: true,
      css: {
        background: theme.colors.typeDisabled
      }
    },
    {
      checked: true,
      disabled: false,
      css: {
        '&:hover': {
          backgroundColor: theme.colors.primaryHover,
          borderColor: theme.colors.primaryHover
        }
      }
    }
  ]
})
