import { theme, styled } from '@mashcard/design-system'

export const MashcardUploaderDashboard = styled('div', {
  minWidth: 620,
  boxSize: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  margin: '0 -8px',

  '.uploader-dashboard-navbar': {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '0 4px',
    height: 40,

    '.uploader-dashboard-action-buttons': {
      position: 'absolute',
      right: 12,
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
          fontSize: theme.fontSizes.callout,
          fontWeight: 500,
          marginLeft: 4
        }
      }
    },

    '.uploader-dashboard-navbar-item': {
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer',
      fontSize: theme.fontSizes.subHeadline,
      fontWeight: 600,
      height: '100%',
      position: 'relative',
      padding: '0 12px',
      color: theme.colors.typeThirdary,

      '&.active, &.focus, &.hover': {
        color: theme.colors.primaryDefault
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
    padding: '8px 12px 2px',
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
    padding: '8px 12px 2px',

    '.dashboard-panel-button': {
      marginTop: 16
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
    padding: '8px 12px 2px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',

    '.dashboard-emoji-search-input': {
      padding: '6px 10px',
      width: '100%',
      height: 32,
      background: '#f7f7f7',
      borderRadius: 4,
      outline: 'none',
      color: '#3e3e3e',
      fontSize: 14,
      marginBottom: 6,

      '&::placeholder': {
        color: '#a6a6a6'
      }
    },

    '.dashboard-emoji-section': {
      minWidth: 589,
      display: 'flex',
      flexDirection: 'column',

      '.dashboard-emoji-list': {
        overflow: 'hidden'
      },

      '.dashboard-emoji-group-name': {
        color: theme.colors.typeThirdary,
        fontSize: theme.fontSizes.subHeadline,
        fontWeight: 600,
        lineHeight: theme.lineHeights.subHeadline,
        background: '#fdfeff',
        height: 37,
        display: 'flex',
        alignItems: 'end',
        paddingLeft: 4,
        paddingBottom: 3
      },

      '.dashboard-emoji-line': {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        marginTop: 3,
        width: 589,

        '.dashboard-emoji-item': {
          fontFamily: theme.fonts.emoji,
          padding: 0,
          fontSize: 27,
          boxSizing: 'border-box',
          marginLeft: 3,
          height: 34,
          width: 34,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',

          '&:first-of-type': {
            marginLeft: 0
          }
        }
      }
    }
  },

  '.uploader-dashboard-unsplash-panel': {
    padding: '8px 12px 2px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',

    '.dashboard-unsplash-image-list': {
      width: 589,
      marginTop: 16,
      overflowX: 'hidden'
    },

    '.unsplash-image-item': {
      flexDirection: 'column',
      alignItems: 'flex-start',
      marginBottom: 8,
      marginLeft: 8,
      cursor: 'pointer',
      height: 'unset',
      borderRadius: 2,
      padding: 0,
      position: 'relative',

      '&:first-of-type': {
        marginLeft: 0
      },

      '&:hover, &:active, &:focus': {
        '.unsplash-image::after': {
          opacity: 1
        },

        '.unsplash-image-username': {
          opacity: 1
        }
      }
    },

    '.unsplash-image': {
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      borderRadius: 2,

      '&::after': {
        content: ' ',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: theme.colors.overlayPrimary,
        opacity: 0,
        transition: `opacity 200ms ${theme.transitions.easeIn}`
      }
    },

    '.unsplash-image-username': {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      color: theme.colors.white,
      fontSize: 12,
      lineHeight: '16px',
      position: 'absolute',
      bottom: 8,
      left: 8,
      opacity: 0,
      transition: `opacity 200ms ${theme.transitions.easeIn}`
    }
  }
})

export const NotFound = styled('p', {
  color: theme.colors.typeSecondary,
  fontSize: theme.fontSizes.subHeadline,
  lineHeight: theme.lineHeights.subHeadline,
  marginTop: '1rem',
  display: 'block',
  width: '100%',
  textAlign: 'center'
})
