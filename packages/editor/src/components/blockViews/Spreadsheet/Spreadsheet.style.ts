import { CSS, theme } from '@mashcard/design-system'

const tableHeaderColor = '#908B9C'
const tableBg = 'rgba(0, 0, 0, 3%)'
const tableBorderColor = '#bdbdbd'
const tableActionLayerWidth = 36
const tableActionBorderColor = 'rgba(0, 0, 0, 5%)'
const tableSelectBg = 'rgba(44, 91, 255, 0.18)'
const tableSelectBorderColor = '#c0cdff'
const tableActionHoverColor = '#356cf9'

export const spreadsheetStyles: CSS = {
  '.mashcard-spreadsheet-block': {
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

  '.node-spreadsheetBlock': {
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
        borderRight: `3px solid ${tableSelectBorderColor}`
      },
      'tr.dragging-over': {
        'td, th': {
          borderBottom: `3px solid ${tableSelectBorderColor}`
        }
      },
      'tr.selected td, tr.dragging td, th.selected, th.dragging, td.selected': {
        background: tableSelectBg,
        borderColor: tableSelectBorderColor,
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

        '.mashcard-formula-editor': {
          display: 'flex',
          alignItems: 'stretch',

          '.ProseMirror': {
            padding: '7px 10px 7px',
            border: 0,
            borderRadius: 0,
            fontSize: 14,
            lineHeight: '22px',
            minHeight: 24,
            outline: `2px solid ${tableActionHoverColor}`,
            transition: 'none'
          },

          p: {
            lineHeight: '22px',
            fontSize: 14
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
  }
}
