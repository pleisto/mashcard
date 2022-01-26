import { theme, css } from '../../../themes'

const inputCommonStyle = {
  position: 'relative',
  backgroundColor: theme.colors.backgroundOverlayPrimary,
  border: `1px solid ${theme.colors.borderSecondary}`,
  color: theme.colors.typePrimary,
  borderRadius: '4px',
  fontSize: '14px',
  width: '100%',
  lineHeight: '1.5',
  margin: '0'
}

const size = {
  small: {
    padding: '3px 6px'
  },
  medium: {
    padding: '5px 10px'
  },
  large: {
    padding: '7px 14px',
    fontSize: '16px'
  }
}

const status = {
  hover: {
    borderColor: theme.colors.borderOverlayThirdary
  },
  focus: {
    outline: `1px solid ${theme.colors.borderOverlayThirdary}`,
    border: `1px solid ${theme.colors.borderOverlayThirdary}`
  },
  disabled: {
    cursor: 'not-allowed',
    color: theme.colors.typeDisabled,
    background: theme.colors.secondaryHover
  },
  invalid: {
    borderColor: theme.colors.errorDefault,
    boxShadow: `0 0 0 2px ${theme.colors.errorBorder}`,
    backgroundColor: theme.colors.errorBg,
    color: theme.colors.errorDefault,
    '&:hover': {
      borderColor: theme.colors.errorDefault
    }
  }
}

export const inputStyle = css({
  ...inputCommonStyle,
  display: 'inline-block',
  '&::placeholder': {
    color: theme.colors.typeDisabled
  },
  '&:hover:not(:disabled)': status.hover,
  '&:focus-visible': status.focus,
  '&:disabled': status.disabled,
  '&:invalid, &[aria-invalid="true"]': {
    ...status.invalid,
    '&:focus-visible': {
      outlineColor: theme.colors.errorDefault
    }
  },
  variants: { size }
})
export const affixWrapperStyle = css({
  ...inputCommonStyle,
  display: 'inline-flex',
  alignItems: 'center',
  flexWrap: 'nowrap',
  '.prefix, .suffix': {
    display: 'flex',
    flex: 'none',
    alignItems: 'center'
  },
  '.prefix': {
    marginRight: '4px'
  },
  '.suffix': {
    marginLeft: '4px'
  },
  input: {
    borderColor: 'transparent',
    background: 'transparent',
    flex: '1'
  },
  'input:focus-visible': {
    outline: 'none'
  },
  variants: {
    size,
    disabled: {
      false: {
        '&:hover': status.hover,
        '&:focus-within': status.focus
      },
      true: {
        ...status.disabled
      }
    },
    invalid: {
      false: {},
      true: {
        ...status.invalid,
        '&:focus-within': {
          outlineColor: theme.colors.errorDefault
        }
      }
    }
  }
})
