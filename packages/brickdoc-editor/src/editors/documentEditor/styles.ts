import { CSS, css, globalCss, theme, rgba } from '@brickdoc/design-system'
import anchorLine from './assets/anchor-line.png'

const fontColor = '#3e3e3e'
const maxWidth = 'var(--brd-editor-max-width)'
const tableHeaderColor = '#908B9C'
const tableBg = 'rgba(0, 0, 0, 3%)'
const tableBorderColor = '#bdbdbd'
const tableActionLayerWidth = 36
const tableActionBorderColor = 'rgba(0, 0, 0, 5%)'
const tableSelectBg = 'rgba(44, 91, 255, 0.18)'
const tableSeletBorderColor = '#c0cdff'
const tableActionHoverColor = '#356cf9'

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

const bulletList = {
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

const baseText = {
  letterSpacing: 0,
  textAlign: 'left',
  fontStyle: 'normal'
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

const brickdoc = css({
  width: '100%',
  maxWidth,
  flex: 1,
  display: 'flex',
  justifyContent: 'center',
  color: fontColor,

  '.ProseMirror': {
    width: '100%',
    outline: 'none',
    paddingBottom: '5rem',
    tabSize: 6,

    '.brickdoc-spreadsheet-block': {
      overflow: 'auto',
      whiteSpace: 'nowrap',
      paddingBottom: 20,
      position: 'relative',

      input: {
        fontWeight: 'normal',
        padding: 0,
        border: 0,
        background: 'transparent',
        margin: 0,
        borderRadius: 0,
        boxShadow: 'none',

        '&:focus': {
          border: 0
        }
      }
    },

    '.node-spreadsheetBlock, .brickdoc-formula-spreadsheet': {
      position: 'relative',

      '.spreadsheet-title': {
        fontSize: '1rem',
        lineHeight: 1.5,
        marginBottom: 8,
        padding: 0
      },
      '.spreadsheet-action': {
        position: 'absolute',
        top: 42,
        zIndex: 100
      },
      'table.spreadsheet-row-actions': {
        opacity: 0,
        transition: `opacity 0.3s ${theme.transitions.easeInOut}`,
        position: 'absolute',
        borderCollapse: 'collapse',
        left: -tableActionLayerWidth,

        '&.dragging': {
          zIndex: 150
        },
        'thead th': {
          height: 33
        },
        'td.row-action-panel': {
          padding: 0,
          border: 0,
          height: 41,
          width: tableActionLayerWidth,
          position: 'relative',

          '.row-action-panel-layer': {
            color: tableHeaderColor,
            height: '100%',
            '.row-number, .row-action': {
              borderRadius: 0,
              borderLeft: 0,
              borderRight: 0,
              position: 'absolute',
              top: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              fontSize: 12,
              lineHeight: 1.5,
              background: tableBg,
              padding: 0,
              minWidth: 0
            },
            '.row-number': {
              borderTop: `1px solid ${tableActionBorderColor}`,
              borderBottom: '1px solid transparent',
              right: 14,
              width: 22
            },
            '.row-action': {
              cursor: 'pointer',
              userSelect: 'none',
              opacity: 0,
              transition: `all 0.3s ${theme.transitions.easeInOut}`,
              borderRadius: '0 4px 4px 0',
              right: '2px',
              width: '12px'
            }
          }
        },
        'tbody > tr:first-child > td.row-action-panel': {
          '.row-number': {
            borderTop: 0,
            borderRadius: '4px 4px 0 0'
          }
        },
        'tbody > tr:last-child > td.row-action-panel': {
          '.row-number': {
            borderRadius: '0 0 4px 4px'
          }
        },
        'tbody > tr.selected, tbody > tr.dragging': {
          'td.row-action-panel': {
            '.row-action-panel-layer': {
              color: tableActionHoverColor
            },
            'row-number, .row-action': {
              background: tableSelectBg
            },
            'row-number': {
              background: tableSelectBg
            }
          }
        },
        'tbody > tr:hover, tbody > tr.hover, tbody > tr.selected, tbody > tr.dragging': {
          'td.row-action-panel': {
            '.row-action': {
              opacity: 1
            },
            '.row-number': {
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0
            }
          }
        },
        'tbody > tr.dragging': {
          'td.row-action-panel': {
            '.row-action-panel-layer': {
              cursor: 'grabbing',
              'button, .row-action': {
                cursor: 'grabbing'
              }
            }
          }
        }
      },
      '&:hover, .hover, &.hover': {
        'table.spreadsheet-row-actions': {
          opacity: 1
        }
      },
      'table.spreadsheet-rows': {
        fontSize: 14,
        borderCollapse: 'collapse',
        thead: {
          background: tableBg
        },

        th: {
          color: tableHeaderColor,
          textAlign: 'center',
          fontWeight: 'normal',
          minWidth: 230,

          input: {
            color: tableHeaderColor,
            textAlign: 'center',
            padding: 0,

            '&:focus': {
              color: theme.colors.deepPurple9
            }
          },

          '.column-action': {
            opacity: 0,
            cursor: 'pointer',
            userSelect: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            height: '100%',
            lineHeight: '20px',
            width: 30,
            right: 0,
            top: -2,
            transition: `all 0.3s ${theme.transitions.easeInOut}`
          },

          '&:hover, &.selected': {
            '.column-action': {
              opacity: 1
            }
          },
          '.resize-handler': {
            height: '100%',
            width: 2,
            position: 'absolute',
            right: -1,
            top: 0,
            border: 0,
            padding: 0,
            cursor: 'ew-resize',
            background: 'transparent'
          },

          '.column, .cell': {
            padding: '4px 6px'
          },
          'input.column': {
            padding: '4px 5px'
          }
        },

        'th.dragging': {
          cursor: 'grabbing'
        },
        'th.dragging-over': {
          borderRight: `3px solid ${tableSeletBorderColor}`
        },
        'tr.dragging-over': {
          'td, th': {
            borderBottom: `3px solid ${tableSeletBorderColor}`
          }
        },
        'tr.selected td, tr.dragging td, th.selected, th.dragging, td.selected': {
          background: tableSelectBg,
          borderColor: tableSeletBorderColor,
          userSelect: 'none'
        },

        'td, th': {
          border: `1px solid ${tableBorderColor}`,
          lineHeight: '22px',
          position: 'relative',

          '.column, .cell': {
            width: '100%',
            overflowX: 'hidden',
            position: 'relative',
            display: 'block',
            lineHeight: '22px',
            fontSize: 14,
            minHeight: 22,

            '&::selection': {
              background: 'transparent'
            }
          },

          '.brickdoc-formula-editor': {
            display: 'flex',
            alignItems: 'stretch',

            '.ProseMirror': {
              padding: '7px 10px 7px',
              border: 0,
              borderRadius: 0,
              fontSize: 14,
              lineHeight: '22px',
              minHeight: 24,
              outline: '2px solid transparent',
              transition: 'none'
            },

            p: {
              lineHeight: '22px',
              fontSize: 14
            },

            '&:focus': {
              outline: `2px solid ${tableActionHoverColor}`
            }
          }
        },

        td: {
          '.cell': {
            padding: '8px 10px',
            minHeight: 38,
            width: 'auto',
            height: '100%',
            wordWrap: 'break-word',
            whiteSpace: 'normal',
            fontFamily: "'Fira Code'"
          }
        }
      }
    },

    '&::selection': {
      color: 'unset',
      background: '#2c5bff1f'
    },

    '&:focus-visible': {
      outline: 'none'
    },

    '& > *': {
      maxWidth
    },

    '& > * + *': {
      marginTop: 12,
      marginBottom: 0
    },

    '& > .ProseMirror-gapcursor + *': {
      marginTop: '0',
      animation: 'ProseMirror-cursor-blink 1.1s steps(start, 2) infinite'
    },

    '.baseText': {
      ...baseText
    },

    'ul[data-node-view-content=""]': {
      padding: '0 0 0 24px',
      margin: 0,

      li: {
        lineHeight: '28px',
        fontSize: '1rem'
      }
    },

    'ol[data-node-view-content=""]': {
      padding: 0,
      counterReset: 'item',
      listStyleType: 'none',

      li: {
        display: 'table',
        counterIncrement: 'item',
        width: '100%',
        lineHeight: '28px',
        fontSize: '1rem'
      },

      'li::before': {
        content: "counters(item, '.') '.'",
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
        lineHeight: 1.5,
        letterSpacing: 0,
        textAlign: 'center'
      },

      'li + li': {
        marginTop: 8
      },

      'li > ol, li > ul': {
        marginTop: 8,
        marginBottom: 0,

        li: {
          marginTop: 4
        }
      }
    },

    '.bullet-list': {
      ...bulletList
    },
    'ul ul ul': {
      ...bulletList,
      'ul ul ul': {
        ...bulletList,
        'ul ul ul': {
          ...bulletList
        }
      }
    },

    s: {
      textDecoration: 'line-through'
    },

    pre: {
      padding: '0 16px 24px',
      fontFamily: "'JetBrainsMono', monospace",
      margin: 0
    },

    'mark.brickdoc-discussion-mark': {
      backgroundColor: 'inherit',
      borderBottom: '2px solid',
      borderBottomColor: theme.colors.blue3,
      color: 'inherit',
      outline: 'none',

      '&.brickdoc-discussion-mark-active, &:active, &:focus, &:hover': {
        backgroundColor: theme.colors.secondarySelected
      }
    },

    'a.brickdoc-link': {
      color: 'inherit',
      textDecoration: 'none',
      borderBottom: '1px solid',
      borderBottomColor: theme.colors.grey5
    },

    img: {
      maxWidth: '100%',
      height: 'auto'
    },

    blockquote: {
      paddingLeft: '1rem',
      borderLeft: '2px solid rgb(#0d0d0d 0.1)'
    },

    'span.brickdoc-formula': {
      color: '#847e8e',
      borderBottom: '1px solid #bfbcc6'
    },

    hr: {
      border: 'none',
      background:
        'linear-gradient(180deg, transparent calc(50% - 1px), #dcdae1 calc(50%), transparent calc(50% + 1px))',
      padding: '12px 0'
    },

    'p.is-empty::before': {
      ...baseText,
      content: 'attr(data-placeholder)',
      float: 'left',
      color: '#a6a6a6',
      pointerEvents: 'none',
      height: 0,
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.5,
      paddingLeft: 4
    }
  }
})

export const brickdocCls = brickdoc()

