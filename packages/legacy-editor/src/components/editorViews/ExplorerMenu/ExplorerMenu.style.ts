import { css, Input, Menu, styled, theme } from '@mashcard/design-system'
import { horizontalPadding as drawHorizontalPadding } from '../../ui/Drawer'

// layout header height
const headerHeight = '3.5rem'

export const drawerStyles = css({
  maxHeight: `calc(100vh - ${headerHeight})`,
  position: 'sticky',
  top: 0,
  left: 0,
  overflow: 'scroll',
  overscrollBehavior: 'contain'
})

export const SearchInputContainer = styled('div', {
  margin: `0 ${drawHorizontalPadding} .625rem`,
  background: theme.colors.ceramicQuaternary,
  borderRadius: '4px'
})

export const SearchInput = styled(Input, {
  background: theme.colors.ceramicQuaternary,
  border: `1px solid ${theme.colors.borderSecondary}`,
  borderRadius: '4px',
  '&::placeholder': {
    fontWeight: 'normal'
  },
  input: {
    border: 0,
    margin: 0,
    padding: 0
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

export const menuIconStyle = css({
  fontSize: '.8125rem',
  height: '1.3rem',
  lineHeight: '.8125rem',
  width: '1.3rem'
})

export const MenuItem = styled(Menu.Item, {
  borderRadius: '4px'
})

export const MenuGroupLabel = styled('span', {
  color: theme.colors.typeSecondary,
  fontWeight: 600
})
