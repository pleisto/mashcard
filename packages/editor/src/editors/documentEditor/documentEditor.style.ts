import { CSS, globalCss, theme } from '@mashcard/design-system'
import { spreadsheetStyles } from '../../components/blockViews/Spreadsheet/Spreadsheet.style'
import { defaultSelectionStyles } from '../../styles/index.style'
import { DEFAULT_SELECTION_CLASS } from '../../extensions'
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
  'mark.mashcard-discussion-mark': {
    backgroundColor: 'inherit',
    borderBottom: `2px solid ${theme.colors.blue3}`,
    color: 'inherit',
    outline: 'none',

    '&.mashcard-discussion-mark-active, &:active, &:focus, &:hover': {
      backgroundColor: theme.colors.secondarySelected
    }
  }
}

const linkStyles: CSS = {
  'a.mashcard-link': {
    color: 'inherit',
    textDecoration: 'none',
    borderBottom: `1px solid ${theme.colors.grey5}`
  }
}

const imageStyles: CSS = {
  img: {
    maxWidth: '100%'
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
  'span.mashcard-formula': {
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

const collaborationStyles: CSS = {
  '.collaboration-cursor__caret': {
    borderLeft: '1px solid #0d0d0d',
    borderRight: '0.5px solid #0d0d0d',
    marginLeft: '-1px',
    marginRight: '-1px',
    pointerEvents: 'none',
    position: 'relative',
    wordBreak: 'normal'
  },

  '.collaboration-cursor__label': {
    color: '#fff',
    fontSize: '0.7rem',
    fontStyle: 'normal',
    fontWeight: 600,
    left: '-1px',
    lineHeight: '1.1rem',
    padding: '0.15rem 0.3rem 0.15rem 0.15rem',
    position: 'absolute',
    top: '-1.3rem',
    userSelect: 'none',
    whiteSpace: 'nowrap',
    borderRadius: '0.65rem'
  }
}

export const selectionStyles: CSS = {
  [`.${DEFAULT_SELECTION_CLASS}`]: {
    ...defaultSelectionStyles['::selection']
  }
}

export const documentEditorStyles = globalCss({
  '::selection': {
    background: 'unset',
    color: 'unset'
  },

  '.mashcard': {
    display: 'flex',
    flex: '1',
    justifyContent: 'center',
    maxWidth: 'var(--mc-editor-max-width)',
    width: '100%',

    '.ProseMirror': {
      color: theme.colors.typePrimary,
      outline: 'none',
      paddingBottom: '5rem',
      tabSize: '6',
      width: '100%',

      '&:focus-visible': {
        outline: 'none'
      },

      '> *': {
        maxWidth: 'var(--mc-editor-max-width)'
      },

      '> * + *': {
        marginTop: '.75rem',
        marginBottom: 0
      },

      ...selectionStyles,

      ...collaborationStyles,

      ...anchorMarkStyles,

      ...strikeStyles,

      ...codeStyles,

      ...discussionMarkStyles,

      ...linkStyles,

      ...imageStyles,

      ...blockquoteStyles,

      ...formulaMarkStyles,

      ...dividerStyles,

      ...spreadsheetStyles
    }
  }
})
