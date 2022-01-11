import { Icon, Input, Menu, styled, theme } from '@brickdoc/design-system'

export const ExplorerOverlay = styled('div', {
  height: 0,
  position: 'fixed',
  right: 0,
  top: 0,
  width: 0,
  variants: {
    visible: {
      true: {
        bottom: 0,
        height: 'unset',
        left: 0,
        width: 'unset'
      },
      false: {
        bottom: 'unset',
        height: 0,
        left: 'unset',
        width: 0
      }
    }
  }
})

export const explorerPadding = '1rem'

export const StyledExplorerMenu = styled('div', {
  background: theme.colors.ceramicSecondary,
  bottom: 0,
  overflow: 'scroll',
  position: 'absolute',
  right: 0,
  transform: 'translateX(100%)',
  transition: 'transform 300ms ease-in-out',
  top: 0,
  width: '17.5rem',
  variants: {
    visible: {
      true: {
        transform: 'translateX(0%)'
      },
      false: {
        transform: 'translateX(100%)'
      }
    }
  }
})

export const ExplorerHeader = styled('div', {
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'row',
  height: '3.75rem',
  justifyContent: 'space-between',
  padding: `0 ${explorerPadding}`
})

export const ExplorerHeaderClose = styled(Icon.Close, {
  color: theme.colors.iconSecondary,
  cursor: 'pointer',
  fontSize: '1rem'
})

export const ExplorerHeaderTitleIcon = styled(Icon.ArrowLeft, {
  color: theme.colors.iconSecondary,
  fontSize: '1.25rem',
  marginRight: '2px'
})

export const ExplorerHeaderTitle = styled('div', {
  alignItems: 'center',
  color: theme.colors.typeSecondary,
  display: 'flex',
  flexDirection: 'row',
  fontSize: theme.fontSizes.body,
  fontWeight: 600
})

export const SearchInputContainer = styled('div', {
  padding: `.625rem ${explorerPadding}`
})

export const SearchInput = styled(Input, {
  background: theme.colors.ceramicQuaternary,
  border: `1px solid ${theme.colors.borderSecondary}`,
  borderRadius: '4px',
  '&::placeholder': {
    fontWeight: 'normal'
  }
})

export const InnerMenuContainer = styled('div', {
  padding: '0 .25rem'
})

export const InnerMenu = styled(Menu, {
  background: 'none',
  border: 'none',
  borderRadius: 0,
  boxShadow: 'none',
  width: '100%'
})

export const MenuIcon = styled('span', {
  include: ['flexCenter'],
  background: 'linear-gradient(0deg, rgba(248, 251, 255, 0.36), rgba(248, 251, 255, 0.36)), rgba(255, 255, 255, 0.74)',
  backdropFilter: 'blur(16px)',
  borderRadius: '2px',
  boxShadow:
    '1px 1px 0px rgba(255, 255, 255, 0.8), 0px 2px 4px rgba(167, 167, 167, 0.3), inset 1px 1px 0px rgba(255, 255, 255, 0.25)',
  display: 'flex',
  fontSize: '.8125rem',
  height: '1.3rem',
  width: '1.3rem'
})

export const MenuItem = styled(Menu.Item, {
  borderRadius: '4px'
})

export const MenuGroupLabel = styled('span', {
  color: theme.colors.typeThirdary,
  fontWeight: 600
})
