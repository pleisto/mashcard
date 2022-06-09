import { css, Menu, styled, theme } from '@brickdoc/design-system'

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
  borderRadius: '4px',
  paddingTop: '.5rem',
  paddingBottom: '.5rem'
})

export const Username = styled('div', {
  color: theme.colors.typePrimary,
  fontSize: theme.fontSizes.callout,
  fontWeight: 500,
  lineHeight: '1.125rem'
})

export const HistoryTime = styled('div', {
  color: theme.colors.typeThirdary,
  fontSize: '.8125rem',
  lineHeight: '1.125rem'
})
