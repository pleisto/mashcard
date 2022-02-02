import { theme, css } from '../../../themes'

const commonStyle = {
  fontSize: '14px',
  width: '100%',
  lineHeight: '1.5'
}

export const inputStyle = css({
  ...commonStyle,
  position: 'relative',
  backgroundColor: theme.colors.backgroundOverlayPrimary,
  border: `1px solid ${theme.colors.borderSecondary}`,
  color: theme.colors.typePrimary,
  borderRadius: '4px',
  margin: '0',
  display: 'inline-flex',
  alignItems: 'center',
  flexWrap: 'nowrap',
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
    borderColor: 'transparent',
    background: 'transparent',
    flex: '1',
    ...commonStyle,
    display: 'inline-block',
    '&::placeholder': {
      color: theme.colors.typeDisabled
    }
  },
  'input:focus-visible': {
    outline: 'none'
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
      false: {
        '&:hover': {
          borderColor: theme.colors.borderOverlayThirdary
        },
        '&:focus-within': {
          outline: `1px solid ${theme.colors.borderOverlayThirdary}`,
          border: `1px solid ${theme.colors.borderOverlayThirdary}`
        }
      },
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
        color: theme.colors.errorDefault,
        '&:hover': {
          borderColor: theme.colors.errorDefault
        },
        '&:focus-within': {
          outlineColor: theme.colors.errorDefault
        }
      }
    }
  }
})
