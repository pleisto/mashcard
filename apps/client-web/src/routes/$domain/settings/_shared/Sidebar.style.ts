import { NavLink } from 'react-router-dom'

import { prefix, styled, theme, globalCss } from '@mashcard/design-system'

export const SidebarWrapper = styled('section', {
  display: 'flex',
  flexDirection: 'column',
  width: '270px',
  height: '100vh',
  padding: '0 8px 32px 8px',
  justifyContent: 'space-between',
  '.actions': {
    header: {
      [`.mc-logo`]: {
        height: '24px',
        margin: '1rem 18px'
      }
    },
    nav: {
      display: 'flex',
      flexDirection: 'column'
    }
  },

  '& > footer': {
    width: '100%',
    display: 'flex',
    justifyContent: 'center'
  }
})

export const MenuItem = styled(NavLink, {
  display: 'inline-flex',
  alignItems: 'center',
  padding: '0 13px',
  height: '3rem',
  marginBottom: theme.space.xxxs,
  color: theme.colors.typeThirdary,
  border: theme.borderStyles.overlaySecondary,
  borderColor: 'transparent',
  verticalAlign: 'middle',
  flexWrap: 'wrap',
  transition: `color 0.3s ${theme.transitions.easeIn}`,
  [`& > .${prefix}-icon`]: {
    marginRight: '4px'
  },
  '&.active, &:hover': {
    color: theme.colors.typePrimary,
    border: theme.borderStyles.overlaySecondary,
    backdropFilter: 'blur(40px)',
    textDecoration: 'none',
    borderRadius: '4px',
    include: ['treeSelected']
  },
  '&.active': {
    background: theme.colors.secondarySelected
  },
  '&:hover': {
    background: theme.colors.secondaryHover
  }
})

export const getNativeSidebarWdith = (): number => {
  const wrapper = window.document.createElement('div')
  wrapper.style.visibility = 'hidden'
  wrapper.style.width = '100px'
  window.document.body.appendChild(wrapper)
  const offset = wrapper.offsetWidth
  wrapper.style.overflow = 'scroll'
  const inner = window.document.createElement('div')
  inner.style.width = '100%'
  wrapper.appendChild(inner)
  const innerOffset = inner.offsetWidth
  const width = offset - innerOffset
  wrapper?.parentNode?.removeChild(wrapper)
  return width
}

const sidebarStyle = {
  '::-webkit-scrollbar': {
    width: 4,
    height: 4,
    background: 'transparent'
  },
  '::-webkit-scrollbar-track': {
    background: 'transparent'
  },
  '::-webkit-scrollbar-thumb': {
    background: theme.colors.overlayPrimary,
    '-webkit-border-radius': '4px',
    transform: 'transfromX(-4px)'
  }
}

export const initSidebarStyle = (): void => {
  try {
    if (getNativeSidebarWdith()) {
      globalCss(sidebarStyle)()
    }
  } catch (e) {
    console.warn(e)
  }
}
