import { theme, styled } from '@mashcard/design-system'
import { IconBackgroundOverlay } from '@mashcard/editor/src/components/ui/Icon/IconBackground'

export const KeyBindTip = styled('span', {
  lineHeight: theme.lineHeights.callout,
  fontSize: theme.fontSizes.callout,
  color: theme.colors.typeThirdary
})

export const IconWrapper = styled(IconBackgroundOverlay, {
  position: 'relative',
  height: '1.3rem',
  width: '1.3rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
})
