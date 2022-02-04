import { css, theme } from '@brickdoc/design-system'

export const highlightStyle = css({
  'code[class*="language-"], pre[class*="language-"]': {
    color: theme.colors.typePrimary,
    textShadow: '0 1px white',
    fontSize: '1em',
    textAlign: 'left',
    whiteSpace: 'pre',
    wordSpacing: 'normal',
    wordBreak: 'normal',
    wordWrap: 'normal',
    lineHeight: 1.5,
    tabSize: 2,
    hyphens: 'none'
  },
  'pre[class*="language-"]::selection, pre[class*="language-"]::selection, code[class*="language-"]::selection, code[class*="language-"]::selection':
    {
      textShadow: 'none'
    },
  '@media print': {
    'code[class*="language-"], pre[class*="language-"]': {
      textShadow: 'none'
    }
  },
  'pre[class*="language-"]': {
    padding: '1em',
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
