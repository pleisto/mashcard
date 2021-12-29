import { theme, css } from '../../../themes'

export const tabsStyle = css({
  display: 'flex',
  fontSize: theme.fontSizes.subHeadline,
  overflow: 'hidden',
  paddingLeft: '16px',

  '&-nav': {
    display: 'flex',
    flex: 'none',
    position: 'relative',

    '&-measure, &-wrap': {
      transform: 'translate(0)',
      position: 'relative',
      flex: 'auto',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      display: 'flex',

      '&-ping-left::before, &-ping-right::after': {
        content: '',
        position: 'absolute',
        top: 0,
        bottom: 0
      },
      '&-ping-left::before': {
        left: 0,
        borderLeft: '1px solid red'
      },
      '&-ping-right::after': {
        right: 0,
        borderRight: '1px solid red'
      },

      '&-ping-top::before, &-ping-bottom::after': {
        content: '',
        position: 'absolute',
        left: 0,
        right: 0
      },
      '&-ping-top::before': {
        top: 0,
        borderTop: '1px solid red'
      },
      '&-ping-bottom::after': {
        bottom: 0,
        borderTop: '1px solid red'
      }
    },

    '&-list': {
      display: 'flex',
      position: 'relative',
      transition: 'transform 0.3s'
    },

    // >>>>>>>> Operations
    '&-operations': {
      display: 'flex',

      '&-hidden': {
        position: 'absolute',
        visibility: 'hidden',
        pointerEvents: 'none'
      }
    },

    '&-more': {
      border: '1px solid blue',
      background: 'rgba(255, 0, 0, 0.1)'
    },
    '&-add': {
      border: '1px solid green',
      background: 'rgba(0, 255, 0, 0.1)'
    }
  },

  '&-tabpane': {
    width: '100%',
    flex: 'none'
  },

  '&-ink-bar': {
    position: 'absolute',
    background: theme.colors.primaryDefault,
    pointerEvents: 'none',
    height: 2,
    bottom: 0,

    '&-animated': {
      transition: 'all 0.3s'
    }
  },

  '&-extra-content': {
    flex: 'none'
  },

  // ========================== Vertical ==========================
  '&-top, &-bottom': {
    flexDirection: 'column',

    '&-ink-bar': {
      bottom: 0
    }
  },

  '&-top': {
    '&-ink-bar': {
      bottom: 0
    }
  },

  '&-bottom': {
    '&-nav': {
      order: 1
    },

    '&-content': {
      order: 0
    },

    '&-ink-bar': {
      top: 0
    }
  },

  // ========================= Horizontal =========================
  '&-left, &-right': {
    '&-editable &-tab': {
      paddingRight: 32
    },

    '&-nav-wrap': {
      flexDirection: 'column'
    },

    '&-ink-bar': {
      width: 3
    },

    '&-nav': {
      flexDirection: 'column',
      minWidth: 50,

      '&-list, &-operations': {
        flex: '1 0 auto', // fix safari scroll problem
        flexDirection: 'column'
      }
    }
  },

  '&-left': {
    '&-ink-bar': {
      right: 0
    }
  },

  '&-right': {
    '&-nav': {
      order: 1
    },

    '&-content': {
      order: 0
    },

    '&-ink-bar': {
      left: 0
    }
  },

  '&-rtl': {
    direction: 'rtl'
  },

  '&-dropdown-rtl': {
    direction: 'rtl'
  },

  '&-tab': {
    display: 'flex',
    outline: 'none',
    cursor: 'pointer',
    position: 'relative',
    border: 0,
    fontSize: theme.fontSizes.subHeadline,
    color: theme.colors.typePrimary,
    margin: 0,
    padding: `${theme.space.sm} 0`,
    marginRight: theme.space.xxl,
    fontWeight: 400,
    alignItems: 'center',

    '&-btn, &-remove': {
      border: 0,
      background: 'transparent'
    },

    '&-btn': {
      lineHeight: theme.lineHeights.subHeadline
    },

    '&-remove': {
      '&:hover': {
        // color: 'red',
      }
    },

    '&-active': {
      fontWeight: 600,
      color: theme.colors.primaryDefault
    }
  },

  '&-content': {
    '&-holder': {
      flex: 'auto'
    },

    display: 'flex',
    width: '100%',

    '&-animated': {
      transition: 'margin 0.3s'
    }
  }
})
