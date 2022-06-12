import { styled, theme } from '@brickdoc/design-system'

export const Wrapper = styled('div', {
  width: 396,
  padding: '0 4px'
})

export const SharePopTitle = styled('h5', {
  lineHeight: '22px',
  fontSize: 14,
  color: theme.colors.typeSecondary,
  margin: '3px 0 19px 0',
  padding: 0
})

export const InviteBar = styled('div', {
  position: 'relative',
  display: 'flex',
  paddingBottom: 10,
  '.user-picker': {
    marginRight: 8,
    flex: 1
  },
  '.invite-btn': {
    height: '2rem'
  }
})

export const List = styled('ul', {
  listStyle: 'none',
  margin: 0,
  padding: 0
})

export const CopyLinkWrapper = styled('div', {
  display: 'flex',
  justifyContent: 'flex-end',
  paddingTop: 12,
  marginTop: 4,
  marginBottom: -2,
  borderTop: '1px solid',
  borderTopColor: theme.colors.dividerOverlayPrimary
})

export const Item = styled('li', {
  padding: '10px 0'
})
