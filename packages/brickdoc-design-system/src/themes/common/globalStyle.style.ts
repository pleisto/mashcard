import { fontFaceSets } from './fontFaceSets.style'
import { ceramicLightTheme } from '../ceramic-light/index'

export const globalStyleSheet = {
  ...fontFaceSets,
  html: {
    fontFamily: 'sans-serif',
    fontSize: '100%',
    textSizeAdjust: '100%',
    '--webkit-font-smoothing': 'antialiased',
    '-moz-osx-font-smoothing': 'grayscale'
  },
  '*, *::before, *::after': {
    boxSizing: 'border-box'
  },
  small: {
    fontSize: '0.8em'
  },
  'b, strong': {
    fontWeight: 'bold'
  },
  'button ,input, select, textarea': {
    margin: 0
  },
  button: {
    textTransform: 'none'
  },
  ':-moz-ui-invalid': {
    boxShadow: 'none'
  },
  body: {
    margin: 0,
    height: '100%',
    width: '100%',
    color: '$colors$typePrimary',
    fontSize: '$fontSizes$body',
    lineHeight: '$lineHeights$base',
    backgroundColor: '$colors$backgroundPrimary',
    OverlayScrollBehaviorY: 'none'
  },
  'body,input,textarea, [data-fontset="sans"]': {
    fontFamily: '$fonts$defaultSans',
    '&:lang(zh-Hant)': {
      fontFamily: '$fonts$zhHanTSans'
    },
    '&:lang(zh-Hans)': {
      fontFamily: '$fonts$zhHanSSans'
    },
    '&:lang(ja)': {
      fontFamily: '$fonts$jaSans'
    }
  },
  'pre, code, kbd, samp': {
    fontSize: '1em'
  },
  'pre, code, kbd, samp, [data-fontset="monospace"]': {
    fontFamily: '$fonts$defaultMonospace',
    '&:lang(zh-Hant)': {
      fontFamily: '$fonts$zhHanTMonospace'
    },
    '&:lang(zh-Hans)': {
      fontFamily: '$fonts$zhHanSMonospace'
    },
    '&:lang(ja)': {
      fontFamily: '$fonts$jaMonospace'
    }
  },
  'h1, h2, h3, h4, h5, h6': {
    marginTop: 0,
    marginBottom: 0,
    fontWeight: '600',
    color: '$colors$typePrimary'
  },
  h1: {
    fontSize: ceramicLightTheme.fontSizes.title1,
    lineHeight: ceramicLightTheme.lineHeights.title1,
    paddingTop: ceramicLightTheme.titleOffset.title1
  },
  h2: {
    fontSize: ceramicLightTheme.fontSizes.title2,
    lineHeight: ceramicLightTheme.lineHeights.title2,
    paddingTop: ceramicLightTheme.titleOffset.title2
  },
  h3: {
    fontSize: ceramicLightTheme.fontSizes.title3,
    lineHeight: ceramicLightTheme.lineHeights.title3,
    paddingTop: ceramicLightTheme.titleOffset.title3
  },
  h4: {
    fontSize: ceramicLightTheme.fontSizes.title4,
    lineHeight: ceramicLightTheme.lineHeights.title4,
    paddingTop: ceramicLightTheme.titleOffset.title4
  },
  h5: {
    fontSize: ceramicLightTheme.fontSizes.title5,
    lineHeight: ceramicLightTheme.lineHeights.title5,
    paddingTop: ceramicLightTheme.titleOffset.title5
  },
  p: {
    marginTop: 0,
    marginBottom: 0
  },
  'input, button, select, optgroup, textarea': {
    margin: 0,
    color: 'inherit',
    fontFamily: 'inherit',
    lineHeight: 'inherit'
  },
  blockquote: {
    margin: '0 0 1em'
  },
  'blockquote, [data-fontset="serif"]': {
    fontFamily: '$fonts$defaultSerif',
    '&:lang(zh-Hant)': {
      fontFamily: '$fonts$zhHanTSerif'
    },
    '&:lang(zh-Hans)': {
      fontFamily: '$fonts$zhHanSSerif'
    },
    '&:lang(ja)': {
      fontFamily: '$fonts$jaSerif'
    }
  },
  'img, iframe': {
    border: 0
  },
  img: {
    objectFit: 'cover'
  },
  a: {
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'color 0.2s',
    color: '$colors$blue9',
    display: 'inline-block',
    '&:hover': {
      textDecoration: 'underline'
    },
    '&[disabled]': {
      color: '$colors$typeDisabled',
      cursor: 'not-allowed',
      pointerEvents: 'none'
    }
  },
  table: {
    borderCollapse: 'revert'
  },
  summary: {
    display: 'list-item'
  },
  'dialog:not([open])': {
    display: 'none'
  },
  hr: {
    color: 'inherit'
  },
  '.brd-icon': {
    display: 'inline-block',
    color: 'inherit',
    fontStyle: 'normal',
    lineHeight: '0',
    textAlign: 'center',
    textTransform: 'none',
    verticalAlign: '-0.125em',
    textRendering: 'optimizeLegibility',
    fontSize: 'inherit',
    fill: 'currentColor',
    '& > *': {
      lineHeight: '1',
      width: '1em',
      height: '1em'
    },
    '&-rtl': {
      transform: 'scaleX(-1)'
    },
    '&-spin svg': {
      animation: 'brd-icon-spin 1s linear infinite'
    },
    '& brd-image': {
      width: '1em',
      height: '1em'
    },
    '&[tabindex]': {
      cursor: 'pointer'
    }
  },
  '@keyframes brd-icon-spin': {
    '100%': {
      transform: 'rotate(360deg)'
    }
  },
  // MUI Global State Classes
  '.Mui-focusVisible': {
    include: ['focusOutline']
  }
}
