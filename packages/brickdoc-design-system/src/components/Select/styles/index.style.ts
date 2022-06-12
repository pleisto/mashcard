import { theme, css } from '../../../themes'

const selector = '&:not(&-customize-input) &-selector'

export const selectStyle = css({
  display: 'inline-block',
  fontSize: theme.fontSizes.body,
  width: 110,
  position: 'relative',
  cursokr: 'pointer',
  overflow: 'hidden',

  [selector]: {
    position: 'relative',
    padding: '5px 0 5px',
    background: theme.colors.ceramicQuaternary,
    border: `1px solid ${theme.colors.borderSecondary}`,
    borderRadius: '4px',
    transition: `all 0.2s ${theme.transitions.easeOut}`,
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
  [`&-focused:not(&-disabled)  &-selector`]: {
    borderColor: theme.colors.borderOverlayThirdary
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
    width: '100%',
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

  '&-single': {},

  '&-selection-search + &-selection-item': {
    flex: 1,
    overflow: 'hidden',
    fontWeight: 'normal',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    fontSize: theme.fontSizes.body,
    lineHeight: theme.lineHeights.body,
    position: 'absolute',
    top: 5,
    left: 16,
    pointerEvents: 'none'
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
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: '50%',
    width: '1em',
    height: '1em',
    lineHeight: 1,
    textAlign: 'center',
    pointerEvents: 'none',
    marginTop: 'calc(-1em / 2)',
    right: '0.25em',
    fontSize: '1em'
  },

  [`&-arrow-icon`]: {
    width: 0,
    height: 0,
    borderWidth: '4px 4px 0',
    borderStyle: 'solid',
    borderColor: `${theme.colors.typeThirdary} transparent transparent `
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
    zIndex: theme.zIndices.dropdown,
    boxSizing: 'border-box',
    borderRadius: '4px',
    padding: '0.5em 0',
    overflow: 'auto',
    fontSize: '1rem',
    fontVariant: 'initial',
    outline: 'none',
    include: ['refractionPrimary'],
    background: theme.colors.ceramicPrimary
  },

  '&-dropdown-hidden': {
    display: 'none'
  },

  '&-item-option': {
    padding: '6px 16px',
    color: theme.colors.typePrimary,
    fontSize: theme.fontSizes.body,
    lineHeight: theme.lineHeights.body
  },

  '&-item-option-active, &-item-option-selected': {
    background: theme.colors.secondaryHover
  },

  '&-item-option-disabled': {
    cursor: 'not-allowed !important',
    background: theme.colors.backgroundSecondary,
    color: theme.colors.typeThirdary
  },

  [`&-item-option-state`]: {
    position: 'absolute',
    right: 10,
    top: 6,
    pointerEvents: 'none'
  },

  '&-hidden': {
    display: 'none'
  },
  '&-item': {
    position: 'relative',
    display: 'block',
    minHeight: '1.5em',
    cursor: 'pointer'
  },

  '&-multiple &-selection-overflow': {
    fontSize: theme.fontSizes.body,
    lineHeight: theme.lineHeights.body,
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%'
  },
  '&-multiple &-selection-overflow > &-selection-overflow-item': {
    marginRight: 6,
    fontSize: theme.fontSizes.body,
    lineHeight: theme.lineHeights.body,
    height: theme.lineHeights.body
  },
  '&-select-selection-overflow-item-suffix': {
    flex: 'none'
  },
  '&-selection-search': {
    lineHeight: theme.lineHeights.body,
    height: theme.lineHeights.body,
    maxWidth: '100%'
  },
  '&-borderless &-selector': {
    backgroundColor: 'transparent !important',
    border: 'none !important',
    paddingLeft: '0 !important'
  }
})
