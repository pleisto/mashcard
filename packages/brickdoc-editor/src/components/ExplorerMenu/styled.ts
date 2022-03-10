import { css, Input, Menu, styled, theme } from '@brickdoc/design-system'

const explorerPadding = '1rem'

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

export const menuIconStyle = css({
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
