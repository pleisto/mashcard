import { theme, css } from '@brickdoc/design-system'

const selector = '&-selector'

export const selectStyle = css({
  display: 'inline-block',
  fontSize: theme.fontSizes.body,
  width: 110,
  position: 'relative',
  cursokr: 'pointer',
  overflow: 'hidden',

  [selector]: {
    position: 'relative',
    padding: '0 72px 0 8px',
    border: `1px solid ${theme.colors.borderSecondary}`,
    borderRadius: '4px',
    transition: `all 0.2s ${theme.transitions.easeOut}`,
    lineHeight: '2rem',
    minHeight: '2rem',
    display: 'flex',
    flexFlow: 'row wrap',
    alignItems: 'center',
    '& input': {
      cursor: 'pointer',
      fontSize: '14px!important',
      color: `${theme.colors.typePrimary}!important`
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

  [`&-focused:not(&-disabled)  &-selector`]: {
    borderColor: theme.colors.borderOverlayThirdary
  },

  '&-selection-placeholder': {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    left: '0.5rem',
    color: theme.colors.typeThirdary,
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    pointerEvents: 'none'
  },
  '&-selection-search-mirror': {
    position: 'absolute',
    width: 'fit-content',
    opacity: 0,
    TouchEvent: 'none'
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
    top: 12,
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
  '&-selection-overflow-item': {
    marginRight: 6,
    display: 'flex',
    alignItems: 'center',
    '.avatar': {
      height: '1rem',
      width: '1rem',
      marginTop: -2.5,
      marginRight: '-0.5rem'
    }
  },
  '&-selection-item': {
    display: 'flex',
    alignItems: 'center',
    background: theme.colors.blue2,
    borderRadius: '1.25rem',
    paddingLeft: 6,
    margin: '4px 0',
    height: '1.5rem'
  },
  '&-selection-item-remove': {
    padding: '0 12px 0 8px'
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
