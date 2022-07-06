import bg from '@/common/assets/ceramicBg.webp'
import { Link } from 'react-router-dom'
import { theme, styled, css } from '@mashcard/design-system'
import { getNativeSidebarWdith } from '@/settings/common/sidebar'

const hideScrollStyle = getNativeSidebarWdith()
  ? {
      '&::-webkit-scrollbar': {
        width: 0,
        height: 0,
        background: 'transparent'
      },
      '&::-webkit-scrollbar-thumb': {
        background: 'transparent'
      },
      '&:hover::-webkit-scrollbar-thumb': {
        background: theme.colors.overlayPrimary
      }
    }
  : null

export const Section = styled('section', {
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  padding: '0.1px 0 0',
  marginTop: '-0.1px',
  justifyContent: 'space-between',
  minWidth: 270,
  maxWidth: 496,
  flexShrink: 0,
  header: {
    transform: 'translateX(8px)'
  },
  '.mainActions': {
    position: 'sticky',
    flex: 1,
    display: 'flex',
    flexFlow: 'column nowrap',
    overflow: 'hidden auto',
    ...hideScrollStyle,
    transform: 'translateX(8px)',
    nav: {
      flex: 1
    }
  },
  footer: {
    zIndex: 2,
    position: 'sticky',
    width: '100%',
    bottom: 0,
    left: 0,
    backdropFilter: 'blur(10px)'
  }
})

export const Layout = styled('div', {
  display: 'flex',
  flex: 'auto',
  flexDirection: 'row',
  minHeight: '100vh',
  background: `url(${bg}) no-repeat center center fixed`,
  backgroundSize: 'cover, cover',
  backgroundClip: 'border-box',
  '.w-split': {
    height: '100%',
    width: '100%'
  },
  '.w-split-horizontal': {
    '.w-split-bar': {
      width: '0.25rem',
      background: 'transparent',
      boxShadow: 'none',
      flexShrink: 0,
      '&:hover': {
        background: 'transparent'
      },
      '&::after, &::before': {
        display: 'none'
      }
    }
  },
  [`${Section}`]: {
    'header > .mc-logo': {
      height: '24px',
      margin: '1rem 18px'
    },
    '& > .mainActions > footer': {
      display: 'flex',
      alignItems: 'center'
    }
  },
  '& main.content': {
    display: 'flex',
    flexDirection: 'column',
    flex: 'auto',
    height: '100vh',
    overflow: 'hidden',
    '& > header': {
      height: '3.5rem',
      padding: '0 3.5rem 0 0',
      lineHeight: '3.5rem'
    },
    '& > section': {
      display: 'grid',
      gridTemplateColumns: '1fr auto',
      gridAutoRows: 'minmax(min-content, 100%)',
      overflowY: 'auto',
      height: '100vh',

      '& > article': {
        include: ['ceramicSecondary'],
        display: 'flex',
        minHeight: '0',
        '--mc-editor-max-width': '960px',
        minWidth: '8rem',
        borderRadius: '2px'
      },
      '& > aside': {
        minWidth: '3rem'
      }
    }
  },

  variants: {
    width: {
      md: {
        [`${Section}`]: {
          display: 'none'
        },
        '.w-split-bar': {
          display: 'none'
        },
        '& main.content': {
          flex: 1,
          '& > header': {
            background: theme.colors.ceramicSecondary
          },
          '& > section': {
            '& > article': {
              background: theme.colors.ceramicSecondary,
              boxShadow: 'unset'
            },
            '& > aside': {
              minWidth: '0rem'
            }
          }
        }
      },
      sm: {
        [`${Section}`]: {
          display: 'none'
        },
        '.w-split-bar': {
          display: 'none'
        },
        '& main.content': {
          flex: 1,
          '& > header': {
            background: theme.colors.backgroundSecondary
          },
          '& > section': {
            '& > article': {
              background: theme.colors.backgroundSecondary,
              boxShadow: 'unset'
            },
            '& > aside': {
              minWidth: '0rem'
            }
          }
        }
      }
    }
  }
})

export const sidebarButtonStyles = {
  color: theme.colors.typeSecondary,
  display: 'flex',
  fontSize: theme.fontSizes.subHeadline,
  justifyContent: 'flex-start',
  flex: 1,
  padding: '0.75rem'
}

export const loadingIconCls = css({
  width: 14,
  height: 14,
  marginRight: 6,
})()

export const SidebarLink = styled(Link, {
  width: '100%',
  height: 34,
  marginTop: 34,
  '&:hover, &:focus-visible, &:active': {
    textDecoration: 'none'
  },
  button: {
    paddingLeft: 29,
    width: '100%',
    justifyContent: 'flex-start',
    span: {
      fontSize: 14,
      fontWeight: 500,
      color: theme.colors.typeSecondary
    },
    '.mc-icon': {
      fontSize: 18
    }
  }
})
