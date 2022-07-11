import { css, CSS, globalCss, theme } from '@mashcard/design-system'
import { spreadsheetStyles } from '../../components/blockViews/Spreadsheet/Spreadsheet.style'
import { defaultSelectionStyles } from '../../styles/index.style'
import anchorLine from './assets/anchor-line.png'

export const h1FontSize = theme.fontSizes.title1
export const h2FontSize = theme.fontSizes.title2
export const h3FontSize = theme.fontSizes.title3
export const h4FontSize = theme.fontSizes.title4
export const h5FontSize = theme.fontSizes.title5

export const h1LienHeight = theme.lineHeights.title1
export const h2LienHeight = theme.lineHeights.title2
export const h3LienHeight = theme.lineHeights.title3
export const h4LienHeight = theme.lineHeights.title4
export const h5LienHeight = theme.lineHeights.title5

export const paragraphFontSize = theme.fontSizes.body
export const paragraphLineHeight = theme.lineHeights.body

const headingStyles: CSS = {
  'h1, h2, h3, h4, h5, h6': {
    marginTop: 0,
    marginBottom: 0,
    fontWeight: '600',
    color: theme.colors.typePrimary,
    wordBreak: 'break-word'
  },
  h1: {
    fontSize: h1FontSize,
    lineHeight: h1LienHeight,
    paddingTop: theme.titleOffset.title1
  },
  h2: {
    fontSize: h2FontSize,
    lineHeight: h2LienHeight,
    paddingTop: theme.titleOffset.title2
  },
  h3: {
    fontSize: h3FontSize,
    lineHeight: h3LienHeight,
    paddingTop: theme.titleOffset.title3
  },
  h4: {
    fontSize: h4FontSize,
    lineHeight: h4LienHeight,
    paddingTop: theme.titleOffset.title4
  },
  h5: {
    fontSize: h5FontSize,
    lineHeight: h5LienHeight,
    paddingTop: theme.titleOffset.title5
  }
}

const paragraphStyles: CSS = {
  p: {
    marginTop: 0,
    marginBottom: 0,
    fontSize: theme.fontSizes.body,
    lineHeight: theme.lineHeights.body,
    wordBreak: 'break-word'
  }
}

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
    margin: 0,
    marginBlock: 0,
    marginInline: 0,
    paddingLeft: '1rem',
    position: 'relative'
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
    padding: '0.15rem 0.5rem 0.15rem 0.15rem',
    position: 'absolute',
    top: '-1.5rem',
    userSelect: 'none',
    whiteSpace: 'nowrap',
    borderRadius: '0.7rem'
  }
}

export const textSelectionClassName = 'text-selection-highlight'
export const nodeSelectionClassName = 'node-selection-highlight'
export const nodeSelectionMouseSelectionClassName = 'node-selection-mouse-selection-highlight'

export const selectionStyles: CSS = {
  [`.${nodeSelectionClassName}`]: {
    ...defaultSelectionStyles['::selection']
  },
  [`.${textSelectionClassName}`]: {
    ...defaultSelectionStyles['::selection']
  }
}

export const globalStyles = globalCss({
  [`.${nodeSelectionMouseSelectionClassName}`]: {
    ...defaultSelectionStyles['::selection']
  }
})

export const documentEditorStyles = css({
  variants: {
    enableSelection: {
      true: {
        ...defaultSelectionStyles
      },
      false: {
        '::selection': {
          background: 'unset',
          color: 'unset'
        }
      }
    }
  },

  display: 'flex',
  flex: '1',
  justifyContent: 'center',
  maxWidth: 'var(--mc-editor-max-width)',
  width: '100%',

  '> .ProseMirror': {
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

    ...headingStyles,

    ...paragraphStyles,

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
})
