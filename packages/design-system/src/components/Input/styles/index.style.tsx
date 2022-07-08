import { theme, css } from '../../../themes'

const onlyBottomBorder = {
  borderTopColor: 'transparent!important',
  borderLeftColor: 'transparent!important',
  borderRightColor: 'transparent!important',
  outline: 'none!important'
}

export const inputStyle = css({
  width: '100%',
  fontSize: '14px',
  position: 'relative',
  color: theme.colors.typePrimary,
  backgroundColor: theme.colors.ceramicQuaternary,
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
    paddingTop: 0,
    paddingBottom: 0,
    borderColor: 'transparent',
    background: 'transparent',
    flex: '1',
    width: '100%',
    display: 'inline-block',
    '&::placeholder': {
      color: theme.colors.typeDisabled
    },
    '&::selection': {
      background: theme.colors.secondarySelected
    }
  },
  'input:focus-visible': {
    outline: 'none',
    caretColor: theme.colors.primaryDefault
  },
  variants: {
    size: {
      sm: {
        padding: '3px 6px',
        lineHeight: theme.lineHeights.callout,
        fontSize: theme.fontSizes.callout
      },
      md: {
        padding: '4px 10px',
        lineHeight: theme.lineHeights.subHeadline,
        fontSize: theme.fontSizes.subHeadline
      },
      lg: {
        padding: '7px 14px',
        fontSize: theme.fontSizes.title5,
        lineHeight: theme.lineHeights.title5
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
    },
    borderType: {
      underline: {
        ...onlyBottomBorder,
        borderBottomColor: 'transparent',
        paddingLeft: '0!important',
        paddingRight: '0!important',
        borderRadius: 0,
        boxShadow: 'none',
        input: {
          paddingLeft: 0,
          paddingRight: 0,
          border: 0
        },
        '&:hover': {
          ...onlyBottomBorder,
          borderBottomColor: theme.colors.dividerPrimary
        },
        '&:focus-within': {
          ...onlyBottomBorder
        }
      },
      outline: {
        input: {
          paddingTop: 0,
          paddingBottom: 0,
          border: 0
        },
        '&:hover': {
          borderColor: theme.colors.borderSecondary,
          background: theme.colors.secondaryHover
        },
        '&:focus-within': {
          background: 'transparent'
        }
      }
    }
  },
  compoundVariants: [
    {
      disabledVariant: false,
      bordered: true,
      invalid: false,
      css: {
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
        borderColor: 'transparent',
        '&:hover': {
          borderColor: theme.colors.errorDefault
        },
        '&:focus-within': {
          outlineColor: theme.colors.errorDefault
        }
      }
    },
    {
      disabledVariant: true,
      borderType: 'underline',
      css: {
        backgroundColor: 'unset',
        color: theme.colors.typeDisabled
      }
    },
    {
      invalid: true,
      borderType: 'outline',
      css: {
        borderColor: `${theme.colors.errorDefault}!important`,
        boxShadow: `0 0 0 2px ${theme.colors.errorBorder}`,
        backgroundColor: theme.colors.errorBg
      }
    },
    {
      invalid: true,
      borderType: 'underline',
      css: {
        borderBottomColor: `${theme.colors.errorDefault}!important`
      }
    }
  ]
})
