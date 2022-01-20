import { theme, css } from '../../../themes'

const selector = '&:not(&-customize-input) &-selector'

export const selectStyle = css({
  position: 'relative',
  display: 'inline-block',
  cursor: 'pointer',
  [selector]: {
    position: 'relative',
    background: theme.colors.ceramicQuaternary,
    border: `1px solid ${theme.colors.borderSecondary}`,
    borderRadius: '4px',
    transition: `all 0.3s ${theme.transitions.easeInOut}`,
    '& input': {
      cursor: 'pointer'
    }
  },
  [`${selector} &-show-search`]: {
    cursor: 'text',
    '& input': {
      cursor: 'auto'
    }
  },
  [`${selector} &-focused:not(&-disabled)`]: {
    include: ['focusOutline']
  },
  [`${selector} &-disabled`]: {
    cursor: 'not-allowed',
    background: theme.colors.black_5p,
    color: theme.colors.typeDisabled,
    '& input': {
      cursor: 'not-allowed'
    }
  },
  [`${selector} &-selection-search-input`]: {
    margin: '0',
    padding: '0',
    background: 'transparent',
    border: 'none',
    outline: 'none',
    appearance: 'none',
    '&::-webkit-search-cancel-button': {
      display: 'none',
      '-webkit-appearance': 'none'
    }
  },
  '&:not(&-disabled):hover &-selector': {
    background: theme.colors.secondaryHover,
    color: theme.colors.typeThirdary
  },
  '&-selection-item': {
    flex: 1,
    overflow: 'hidden',
    fontWeight: 'normal',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis'
  },
  '&-selection-placeholder': {
    flex: 1,
    overflow: 'hidden',
    color: theme.colors.typeThirdary,
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    pointerEvents: 'none'
  },
  '&-arrow': {
    position: 'absolute',
    top: '50%',
    width: '1em',
    height: '1em',
    lineHeight: 1,
    textAlign: 'center',
    pointerEvents: 'none',
    marginTop: 'calc(-1em / 2)',
    right: '0.5em',
    fontSize: '1em'
  },
  '&-disabled': {
    cursor: 'not-allowed'
  },
  '&-clear': {
    position: 'absolute',
    top: '50%',
    right: '0.5em',
    zIndex: 1,
    display: 'inline-block',
    width: '1em',
    height: '1em',
    marginTop: 'calc(-1em / 2)',
    fontSize: '1em',
    fontStyle: 'normal',
    lineHeight: 1,
    textAlign: 'center',
    textTransform: 'none',
    cursor: 'pointer',
    opacity: 0,
    textRendering: 'auto',
    transition: `color 0.3s ${theme.transitions.easeIn}, opacity 0.15s ${theme.transitions.easeIn}`,
    '&::before': {
      display: 'block'
    },
    '&:hover': {
      opacity: 1
    }
  },
  '&-dropdown': {
    position: 'absolute',
    // top: '-9999px',
    // left: '-9999px',
    zIndex: theme.zIndices.dropdown,
    boxSizing: 'border-box',
    padding: '0.5em 0',
    overflow: 'auto',
    fontSize: '1rem',
    fontVariant: 'initial',
    outline: 'none',
    include: ['refractionPrimary'],
    background: theme.colors.ceramicPrimary
  },
  '&-hidden': {
    display: 'none'
  },
  '&-item': {
    position: 'relative',
    display: 'block',
    minHeight: '1.5em',
    cursor: 'pointer'
  }
})
