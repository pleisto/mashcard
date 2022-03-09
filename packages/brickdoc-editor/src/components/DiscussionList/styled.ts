import { styled, Tabs, theme } from '@brickdoc/design-system'
import { Drawer } from '../Drawer'

export const FilterTabs = styled(Tabs, {
  paddingLeft: 0
})

export const StyledDiscussionList = styled('div', {
  include: ['ceramicSecondary'],
  borderLeft: `1px solid ${theme.colors.dividerOverlayPrimary}`,
  borderTopRightRadius: '2px',
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  padding: '0.75rem 1.125rem',
  width: '17.5rem'
})

export const ListTitle = styled('div', {
  color: theme.colors.typeSecondary,
  fontSize: theme.fontSizes.body,
  fontWeight: 600,
  lineHeight: '1.5rem',
  marginBottom: '1.625rem'
})

export const DiscussionDrawer = styled(Drawer, {
  position: 'absolute',
  display: 'none',
  bottom: 'unset'
})

export const ListWrapper = styled('div', {})

export const ListPanel = styled('div', {
  overflow: 'hidden'
})

export const ConversationWrapper = styled('div', {})
