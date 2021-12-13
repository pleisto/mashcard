import { fontFaceSets } from './fontFaceSets.style'
export const globalStyleSheet = {
  ...fontFaceSets,
  html: {
    fontFamily: 'sans-serif',
    fontSize: '100%',
    textSizeAdjust: '100%'
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
    '--webkit-font-smoothing': 'antialiased',
    fontFamily: '$fonts$defaultSans',
    color: '$colors$typePrimary',
    fontSize: '$fontSizes$body',
    lineHeight: '$lineHeights$base',
    backgroundColor: '$colors$backgroundPrimary',
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
    fontFamily: '$fonts$defaultMonospace',
    fontSize: '1em',
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
    marginBottom: '0.5em',
    fontWeight: '500',
    color: '$colors$typePrimary'
  },
  p: {
    marginTop: 0,
    marginBottom: '1em'
  },
  blockquote: {
    margin: '0 0 1em',
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
  a: {
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'color 0.2s',
    color: 'inherit',
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
  // fix for the content editable attribute will work properly
  ':where([contenteditable])': {
    '-moz-user-modify': 'read-write',
    '-webkit-user-modify': 'read-write',
    overflowWrap: 'break-word',
    '-webkit-line-break': 'after-white-space'
  },
  summary: {
    display: 'list-item'
  },
  'dialog:not([open])': {
    display: 'none'
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
  }
}
