import { CSS, globalCss, theme, rgba } from '@brickdoc/design-system'
import { spreadsheetStyles } from '../../components/blockViews/Spreadsheet/Spreadsheet.style'
import anchorLine from './assets/anchor-line.png'

const anchorMarkStyles = {
  'span[data-anchor]': {
    position: 'relative'
  },

  'span[data-anchor]::after': {
    content: '',
    position: 'absolute',
    right: 0,
    bottom: '-2px',
    height: '1px',
    left: '3px',
    backgroundImage: `url(${anchorLine})`,
    backgroundRepeat: 'repeat-x',
    backgroundPosition: '0 0',
    backgroundSize: '10%'
  }
}

const strikeStyles: CSS = {
  s: {
    textDecoration: 'line-through'
  }
}

const codeStyles: CSS = {
  pre: {
    background: '#f9f9f9',
    fontFamily: `'JetBrainsMono', monospace`,
    margin: 0,
    padding: '0 1rem 1.5rem'
  }
}

const discussionMarkStyles: CSS = {
  'mark.brickdoc-discussion-mark': {
    backgroundColor: 'inherit',
    borderBottom: `2px solid ${theme.colors.blue3}`,
    color: 'inherit',
    outline: 'none',

    '&.brickdoc-discussion-mark-active, &:active, &:focus, &:hover': {
      backgroundColor: theme.colors.secondarySelected
    }
  }
}

const linkStyles: CSS = {
  'a.brickdoc-link': {
    color: 'inherit',
    textDecoration: 'none',
    borderBottom: `1px solid ${theme.colors.grey5}`
  }
}

const imageStyles: CSS = {
  img: {
    maxWidth: '100%',
    height: 'auto'
  }
}

const blockquoteStyles: CSS = {
  blockquote: {
    borderLeft: `2px solid ${theme.colors.backgroundThirdary}`,
    color: theme.colors.typeSecondary,
    fontWeight: 450,
    paddingLeft: '1rem'
  }
}

const formulaMarkStyles: CSS = {
  'span.brickdoc-formula': {
    borderBottom: '1px solid #bfbcc6',
    color: '#847e8e'
  }
}

const dividerStyles: CSS = {
  hr: {
    background: 'linear-gradient(180deg, transparent calc(50% - 1px), #dcdae1 calc(50%), transparent calc(50% + 1px))',
    border: 'none',
    padding: '12px 0'
  }
}

export const documentEditorStyles = globalCss({
  '.brickdoc': {
    display: 'flex',
    flex: '1',
    justifyContent: 'center',
    maxWidth: 'var(--brd-editor-max-width)',
    width: '100%',

    '.ProseMirror': {
      color: theme.colors.typePrimary,
      outline: 'none',
      paddingBottom: '5rem',
      tabSize: '6',
      width: '100%',

      '::selection': {
        color: 'unset',
        // selection background color overrides line-through style
        // we need set alpha to make line-through style visible
        background: rgba(theme.colors.secondarySelected.value, 0.18)
      },

      '&:focus-visible': {
        outline: 'none'
      },

      '> *': {
        maxWidth: 'var(--brd-editor-max-width)'
      },

      '> * + *': {
        marginTop: '.75rem',
        marginBottom: 0
      },

      ...anchorMarkStyles,

      ...strikeStyles,

      ...codeStyles,

      ...discussionMarkStyles,

      ...linkStyles,

      ...imageStyles,

      ...blockquoteStyles,

      ...formulaMarkStyles,

      ...dividerStyles,

      ...spreadsheetStyles,

      /* Placeholder (on every new line) */
      'p.is-empty::before': {
        letterSpacing: 0,
        textAlign: 'left',
        fontStyle: 'normal',
        content: 'attr(data-placeholder)',
        float: 'left',
        color: '#a6a6a6',
        pointerEvents: 'none',
        height: 0,
        fontSize: '1rem',
        fontWeight: 400,
        lineHeight: '1.5rem',
        paddingLeft: '4px'
      }
    }
  }
})
