import { theme } from '../../../themes'

export const deprecatedMenuStyle = {
  '&-menu': {
    position: 'relative',
    margin: 0,
    padding: '4px 0',
    textAlign: 'left',
    listStyleType: 'none',
    backgroundColor: theme.colors.white,
    backgroundClip: 'padding-box',
    borderRadius: '4px',
    boxShadow: '0 3px 6px -4px #0000001f,0 6px 16px #00000014,0 9px 28px 8px #0000000d',
    '&-item-group-title': {
      padding: '5px 12px',
      color: '#847ed8',
      transition: 'all .3s'
    },
    '&-submenu-popup': {
      position: 'absolute',
      zIndex: theme.zIndices.dropdown,
      background: 'transparent',
      boxShadow: 'none',
      transformOrigin: '0 0',
      '& ul, & li': {
        listStyle: 'none'
      },
      '& ul': {
        marginRight: '.3em',
        marginLeft: '.3em'
      }
    },
    '&-item': {
      position: 'relative',
      display: 'flex',
      alignItems: 'center'
    },
    '&-item-icon': {
      minWidth: '12px',
      marginRight: '8px',
      fontSize: '1em'
    },
    '&-title-content': {
      flex: 'auto',
      '&>a': {
        color: 'inherit',
        transition: 'all .3s',
        '&:hover': {
          color: 'inherit'
        },
        '&:after': {
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          content: '""'
        }
      }
    },
    '&-item, &-submenu-title': {
      clear: 'both',
      margin: 0,
      padding: '5px 12px',
      color: '#292323',
      fontWeight: '400',
      fontSize: '1rem',
      lineHeight: theme.lineHeights.body,
      whiteSpace: 'nowrap',
      cursor: 'pointer',
      transition: 'all .3s'
    },
    '&-item-selected, &-submenu-title-selected': {
      color: theme.colors.primaryDefault,
      fontWeight: '600',
      backgroundColor: '#fcfcfa'
    },
    '&-item:hover, &-submenu-title:hover': {
      backgroundColor: '#f5f5f5'
    },
    '&-item-disabled, &-submenu-title-disabled': {
      color: theme.colors.black_35p,
      cursor: 'not-allowed',
      '&:hover': {
        color: theme.colors.black_35p,
        backgroundColor: theme.colors.white
      },
      a: {
        pointEvents: 'none'
      }
    },
    '&-item-divider, &-submenu-title-divider': {
      height: '1px',
      margin: '4px 0',
      overflow: 'hidden',
      lineHeight: '0',
      backgroundColor: '#f6f6f6'
    },
    '&-item &-submenu-expand-icon, &-submenu-title &-submenu-expand-icon': {
      position: 'absolute',
      right: '8px'
    },
    '&-item &-submenu-expand-icon &-submenu-arrow-icon, &-submenu-title &-submenu-expand-icon &-submenu-arrow-icon': {
      marginRight: '0 !important',
      color: '#847e8e',
      fontSize: '10px',
      fontStyle: 'normal'
    },
    '&-item-group-list': {
      margin: '0 8px',
      padding: 0,
      listStyle: 'none'
    },
    '&-submenu-title': {
      paddingRight: '26px'
    },
    '&-submenu-vertical': {
      position: 'relative'
    },
    '&-submenu-vertical > &': {
      position: 'absolute',
      top: 0,
      left: '100%',
      minWidth: '100%',
      marginLeft: '4px',
      transformOrigin: '0 0'
    },
    '&-submenu-selected &-submenu-title': {
      color: theme.colors.primaryDefault
    }
  }
}
