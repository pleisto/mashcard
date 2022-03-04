import { theme, css } from '../../../themes'

export const inputStyle = css({
  width: '100%',
  fontSize: '14px',
  position: 'relative',
  color: theme.colors.typePrimary,
  backgroundColor: theme.colors.ceramicQuaternary,
  lineHeight: '1.5',
  borderRadius: '4px',
  margin: '0',
  display: 'inline-flex',
  alignItems: 'center',
  flexWrap: 'nowrap',
  transition: `all .2s ${theme.transitions.easeOut}`,
  '&.MuiInput-adornedStart, &.MuiInput-adornedEnd': {
    display: 'flex',
    flex: 'none',
    alignItems: 'center'
  },
  '&.MuiInput-adornedStart input': {
    marginLeft: '4px'
  },
  '&.MuiInput-adornedEnd input': {
    marginRight: '4px'
  },
  input: {
    fontSize: '1em',
    lineHeight: 'inherit',
    borderColor: 'transparent',
    background: 'transparent',
    flex: '1',
    width: '100%',
    display: 'inline-block',
    '&::placeholder': {
      color: theme.colors.typeThirdary
    },
    '&::selection': {
      background: theme.colors.secondarySelected
    }
  },
  'input:focus-visible': {
    outline: 'none',
    caretColor: theme.colors.primaryDefault
    // background: theme.colors.backgroundOverlayPrimary
  },
  variants: {
    size: {
      sm: {
        padding: '3px 6px'
      },
      md: {
        padding: '5px 10px'
      },
      lg: {
        padding: '7px 14px',
        fontSize: '16px'
      }
    },
    disabledVariant: {
      false: {},
      true: {
        cursor: 'not-allowed',
        color: theme.colors.typeDisabled,
        background: theme.colors.secondaryHover
      }
    },
    invalid: {
      false: {},
      true: {
        borderColor: theme.colors.errorDefault,
        boxShadow: `0 0 0 2px ${theme.colors.errorBorder}`,
        backgroundColor: theme.colors.errorBg,
        color: theme.colors.errorDefault
      }
    },
    bordered: {
      false: {
        border: '0'
      },
      true: {
        border: `1px solid ${theme.colors.borderSecondary}`
      }
    }
  },
  compoundVariants: [
    {
      disabledVariant: false,
      bordered: true,
      css: {
        '&:hover': {
          borderColor: theme.colors.borderOverlayThirdary,
          background: theme.colors.secondaryHover
        },
        '&:focus-within': {
          outline: `none`,
          border: `1px solid ${theme.colors.borderOverlayThirdary}`
        }
      }
    },
    {
      invalid: true,
      disabledVariant: false,
      bordered: true,
      css: {
        '&:hover': {
          borderColor: theme.colors.errorDefault
        },
        '&:focus-within': {
          outlineColor: theme.colors.errorDefault
        }
      }
    }
  ]
})
