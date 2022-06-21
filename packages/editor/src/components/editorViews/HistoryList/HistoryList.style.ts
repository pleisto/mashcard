import { css, Menu, styled, theme, Avatar } from '@mashcard/design-system'

const headerHeight = '3.5rem'

export const drawerStyles = css({
  maxHeight: `calc(100vh - ${headerHeight})`,
  position: 'sticky',
  top: 0,
  left: 0,
  overflow: 'scroll'
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
  borderRadius: '4px',
  paddingTop: '.5rem',
  paddingBottom: '.5rem'
})

export const Username = styled('div', {
  color: theme.colors.typeThirdary,
  fontSize: theme.fontSizes.subHeadline,
  lineHeight: '1.3rem'
})

export const HistoryTime = styled('div', {
  color: theme.colors.typePrimary,
  fontSize: theme.fontSizes.subHeadline,
  lineHeight: theme.lineHeights.subHeadline
})

export const HistoryAvatar = styled(Avatar, {
  marginRight: '.25rem'
})
