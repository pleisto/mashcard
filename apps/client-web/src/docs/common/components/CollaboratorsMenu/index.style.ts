import { theme, styled } from '@brickdoc/design-system'
import { PodAvatar } from '@/common/components/PodAvatar'

export const Avatar = styled(PodAvatar, {
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
