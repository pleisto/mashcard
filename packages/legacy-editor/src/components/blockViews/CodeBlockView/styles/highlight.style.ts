import { css, styled, theme } from '@mashcard/design-system'
import { defaultSelectionStyles } from '../../../../styles/index.style'

export const ViewModeBar = styled('div', {
  height: 47,
  borderBottom: '1px solid',
  borderColor: theme.colors.dividerOverlayPrimary,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  cursor: 'pointer',
  margin: '0 16px 16px',
  color: theme.colors.typeThirdary,
  fontSize: theme.fontSizes.callout
})

export const CodeContainer = styled('div', {
  borderRadius: 4,
  background: theme.colors.backgroundPrimary,
  border: '1px solid',
  borderColor: theme.colors.grey3,
  ...defaultSelectionStyles
})

export const CodeScroll = css({
  '& > div': {
    wordBreak: 'break-all!important',
    whiteSpace: 'pre!important'
  }
})

export const SwitchContainer = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  '.label': {
    fontSize: theme.fontSizes.callout,
    lineHeight: theme.lineHeights.callout,
    marginRight: 8
  }
})

const prePaddingLeft = '3rem'
const prePaddingTop = '1rem'

export const placeholderStyle = css({
  pre: {
    '&:before': {
      color: theme.colors.typeThirdary,
      content: 'attr(data-placeholder)',
      left: prePaddingLeft,
      pointerEvents: 'none',
      position: 'absolute',
      top: prePaddingTop,
      whiteSpace: 'nowrap'
    }
  }
})

export const highlightStyle = css({
  'code[class*="language-"], pre[class*="language-"]': {
    color: theme.colors.typePrimary,
    textShadow: '0 1px white',
    fontSize: theme.fontSizes.callout,
    lineHeight: theme.lineHeights.code,
    textAlign: 'left',
    whiteSpace: 'pre',
    wordSpacing: 'normal',
    wordBreak: 'normal',
    wordWrap: 'normal',
    tabSize: 2,
    hyphens: 'none',
    background: theme.colors.backgroundPrimary
  },
  'pre[class*="language-"]::selection, pre[class*="language-"]::selection, code[class*="language-"]::selection, code[class*="language-"]::selection':
    {
      textShadow: 'none'
    },
  'pre[class*="language-"].line-numbers': {
    position: 'relative',
    paddingLeft: prePaddingLeft,
    counterReset: 'linenumber'
  },
  'pre[class*="language-"].line-numbers > code': {
    position: 'relative',
    whiteSpace: 'inherit'
  },
  '.line-numbers .line-numbers-rows': {
    position: 'relative',
    pointerEvents: 'none',
    width: 0,
    height: 0,
    display: ' inline-block'
  },
  '.line-numbers-rows::after': {
    content: 'counter(linenumber)',
    position: 'absolute',
    top: -17,
    left: '-3rem',
    width: '2rem',
    counterIncrement: 'linenumber',
    color: theme.colors.typeSecondary,
    lineHeight: theme.lineHeights.code,
    display: 'block',
    textAlign: 'right'
  },
  '@media print': {
    'code[class*="language-"], pre[class*="language-"]': {
      textShadow: 'none'
    }
  },
  'pre[class*="language-"]': {
    padding: '1em',
    paddingTop: prePaddingTop,
    margin: '.5em 0',
    overflow: 'auto'
  },
  ':not(pre) > code[class*="language-"]': {
    padding: '.1em',
    borderRadius: '.3em',
    whiteSpace: 'normal'
  },
  '.token.comment, .token.prolog, .token.doctype, .token.cdata': {
    color: theme.colors.deepPurple3
  },
  '.token.punctuation': { color: '#756C6C' },
  '.token.namespace': { opacity: 0.7 },
  '.token.property, .token.tag, .token.boolean, .token.number, .token.constant, .token.symbol, .token.deleted': {
    color: theme.colors.pink8
  },
  '.token.selector, .token.attr-name, .token.string, .token.char, .token.builtin, .token.inserted': {
    color: '#508400'
  },
  '.token.operator, .token.entity, .token.url, .language-css .token.string, .style .token.string': {
    color: theme.colors.yellow9
  },
  '.token.atrule, .token.attr-value, .token.keyword': { color: theme.colors.blue8 },
  '.token.function, .token.class-name': { color: '#C9314F' },
  '.token.regex, .token.important, .token.variable': { color: '#966908' },
  '.token.important, .token.bold': { fontWeight: 'bold' },
  '.token.italic': { fontStyle: 'italic' },
  '.token.entity': { cursor: 'help' }
})
