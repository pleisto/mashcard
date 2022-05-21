import { theme, styled } from '@brickdoc/design-system'

export const BrickdocUploaderDashboard = styled('div', {
  minWidth: 500,
  minHeight: 153,
  boxSize: 'border-box',
  display: 'flex',
  flexDirection: 'column',

  '.uploader-dashboard-navbar': {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,

    '&::after': {
      content: '',
      position: 'absolute',
      left: 24,
      right: 24,
      bottom: 0,
      height: 1,
      backgroundColor: '#efefef'
    },

    '.uploader-dashboard-action-buttons': {
      position: 'absolute',
      right: 24,
      top: 0,
      bottom: 0,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',

      '.dashboard-action-button': {
        padding: 4,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',

        '.dashboard-action-button-icon': {
          color: '#a6a6a6',
          fontSize: 14
        },

        '.dashboard-action-button-label': {
          color: '#a6a6a6',
          fontSize: 14,
          marginLeft: 4
        }
      }
    },

    '.uploader-dashboard-navbar-item': {
      display: 'flex',
      alignItems: 'center',
      marginLeft: 24,
      cursor: 'pointer',
      fontSize: 14,
      fontWeight: 400,
      height: '100%',
      position: 'relative',

      '&.active, &.focus, &.hover': {
        background: 'none',
        color: theme.colors.primaryDefault
      },

      '&::after': {
        content: 'none',
        position: 'absolute',
        zIndex: 1,
        height: 2,
        backgroundColor: theme.colors.primaryDefault,
        left: 0,
        right: 0,
        bottom: 0
      },

      '&.active': {
        '&::after': {
          content: ''
        }
      }
    }
  },

  '.dashboard-panel-button': {
    boxSizing: 'border-box',
    boxShadow: '0 2px 0 rgb(0 0 0 / 4.3%)',
    borderRadius: 2,
    color: theme.colors.white,
    fontSize: 14,
    lineHeight: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '6px 16px',
    cursor: 'pointer',
    width: '100%'
  },

  '.dashboard-panel-hint': {
    color: '#bfbcc6',
    fontSize: '14px',
    lineHeight: '20px',
    marginTop: '16px'
  },

  '.uploader-dashboard-upload-panel': {
    padding: '0 16px',
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',

    '.dashboard-upload-file-input': {
      display: 'none'
    }
  },

  '.uploader-dashboard-link-panel': {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 24,

    '.dashboard-panel-button': {
      marginTop: 16
    },

    '.dashboard-link-panel-input': {
      width: '100%',
      background: '#f7f7f7',
      borderRadius: 4,
      border: 'none',
      lineHeight: '20px',
      fontSize: 14,
      color: '#3e3e3e',
      padding: '6px 16.5px',

      '&::placeholder': {
        color: '#a6a6a6'
      }
    }
  },

  '.uploader-dashboard-gallery-panel': {
    width: '584px',
    padding: '24px',
    boxSizing: 'content-box',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

    '.dashboard-gallery-group': {
      marginBottom: 16,

      '.dashboard-gallery-group-name': {
        color: '#a6a6a6',
        fontSize: 14,
        lineHeight: '20px',
        marginBottom: 8
      },

      '.dashboard-color-list': {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',

        '.dashboard-color-item': {
          cursor: 'pointer',
          width: 140,
          height: 74,
          borderRadius: 4,
          marginRight: 6,
          marginBottom: 8
        }
      }
    }
  },

  '.uploader-dashboard-emoji-panel': {
    padding: 24,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,

    '.dashboard-emoji-search-input': {
      padding: '6px 10px',
      width: '100%',
      height: 32,
      background: '#f7f7f7',
      border: 'none',
      borderRadius: 4,
      outline: 'none',
      color: '#3e3e3e',
      fontSize: 14,
      marginBottom: 16,

      '&::placeholder': {
        color: '#a6a6a6'
      }
    },

    '.dashboard-emoji-section': {
      width: 512,
      height: 323,
      overflow: 'scroll',
      display: 'flex',
      flexDirection: 'column',

      '.dashboard-emoji-group': {
        marginBottom: 18,

        '.dashboard-emoji-group-name': {
          color: '#a6a6a6',
          fontSize: 14,
          lineHeight: '20px'
        },

        '.dashboard-emoji-list': {
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignItems: 'center',

          '.dashboard-emoji-item': {
            padding: 0,
            borderRadius: 0,
            fontSize: 27,
            boxSizing: 'border-box',
            height: 32,
            width: 32,
            marginTop: 9,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',

            '&:active, &:focus, &:hover': {
              background: '#efefef'
            }
          }
        }
      }
    }
  },

  '.uploader-dashboard-unsplash-panel': {
    padding: 24,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',

    '.dashboard-unsplash-search-input': {
      padding: '6px 10px',
      width: '100%',
      height: 32,
      background: '#f7f7f7',
      border: 'none',
      borderRadius: 4,
      outline: 'none',
      color: '#3e3e3e',
      fontSize: 14,

      '&::placeholder': {
        color: '#a6a6a6'
      }
    },

    '.dashboard-unsplash-image-list': {
      width: 574,
      height: 328,
      marginTop: 16,
      overflow: 'scroll',
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'space-between',

      '.unsplash-image-item': {
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginBottom: '6px',
        cursor: 'pointer',
        height: 'unset',
        borderRadius: 0,
        padding: 0
      },

      '.unsplash-image': {
        width: 120,
        height: 90,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        borderRadius: 4
      },

      '.unsplash-image-username': {
        width: 120,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        color: '#a6a6a6',
        fontSize: 12,
        lineHeight: '16px',
        marginTop: 4
      }
    }
  }
})
