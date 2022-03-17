import { Button, styled, Tabs, theme } from '@brickdoc/design-system'
import { width as drawerWidth, horizontalPadding as drawerPadding } from '../../ui/Drawer'

export const FilterTabs = styled(Tabs, {
  paddingLeft: 0,
  width: `calc(${drawerWidth} - 2 * ${drawerPadding})`
})

export const DiscussionListContainer = styled('div', {})

export const ListTitle = styled('div', {
  color: theme.colors.typeSecondary,
  fontSize: theme.fontSizes.body,
  fontWeight: 600,
  lineHeight: '1.5rem',
  marginBottom: '1.625rem'
})

export const ListWrapper = styled('div', {})

export const ListPanel = styled('div', {
  overflow: 'scroll'
})

export const ConversationWrapper = styled('div', {})

export const CloseButton = styled(Button, {
  position: 'absolute',
  height: '1rem',
  right: '1rem',
  top: '1rem',
  width: '1rem',
  variants: {
    size: {
      md: {
        fontSize: '1rem',
        padding: 0
      }
    }
  }
})
