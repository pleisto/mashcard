import { theme, styled } from '@brickdoc/design-system'
import { SpaceAvatar } from '@/common/components/SpaceAvatar'

export const Avatar = styled(SpaceAvatar, {
  outlineColor: theme.colors.white,
  outlineWidth: '0.125rem',
  outlineStyle: 'solid',
  variants: {
    isMore: {
      true: {
        background: `${theme.colors.grey5.value}!important`,
        color: theme.colors.white
      }
    }
  }
})
