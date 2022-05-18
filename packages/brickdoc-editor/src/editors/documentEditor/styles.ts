import { CSS, globalCss, theme } from '@brickdoc/design-system'
import { rgba } from 'polished'
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

const listLevelStyles = {
  'ul[data-node-view-content=""]': {
    listStyleType: 'disc',

    ul: {
      listStyleType: 'circle',

      ul: {
        listStyleType: 'square'
      }
    }
  }
}

const listStyles: CSS = {
  'ul[data-node-view-content=""]': {
    margin: 0,
    padding: '0 0 0 1.5rem',
    ...listLevelStyles['ul[data-node-view-content=""]'],

    li: {
      fontSize: '1rem',
      lineHeight: '1.75rem'
    }
  },

  'ol[data-node-view-content=""]': {
    counterReset: 'item',
    listStyleType: 'none',
    padding: 0,

    li: {
      counterIncrement: 'item',
      display: 'table',
      fontSize: '1rem',
      lineHeight: '1.75rem',
      width: '100%'
    },

    'li::before': {
      content: `counters(item, '.') '.'`,
      display: 'table-cell',
      fontWeight: 'bold',
      paddingRight: '4px',
      width: '10px'
    }
  },

  'ul[data-node-view-content=""], ol[data-node-view-content=""]': {
    'li::marker': {
      fontSize: '1rem',
      fontWeight: 400,
      letterSpacing: 0,
      lineHeight: '1.5rem',
      textAlign: 'center'
    },

    'li + li': {
      marginTop: '.5rem'
    },

    'li > ol, li > ul': {
      marginBottom: 0,
      marginTop: '.5rem',

      li: {
        marginTop: '4px'
      }
    }
  },

  'ul ul ul': {
    ...listLevelStyles,

    'ul ul ul': {
      ...listLevelStyles,

      'ul ul ul': {
        ...listLevelStyles
      }
    }
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
    borderLeft: '2px solid rgb(#0d0d0d 0.1)',
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

      ...listStyles,

      ...strikeStyles,

      ...codeStyles,

      ...discussionMarkStyles,

      ...linkStyles,

      ...imageStyles,

      ...blockquoteStyles,

      ...formulaMarkStyles,

      ...dividerStyles,

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
