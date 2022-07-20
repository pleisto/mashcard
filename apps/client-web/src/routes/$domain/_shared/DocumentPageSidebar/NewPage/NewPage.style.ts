import { Button, css, styled, theme } from '@mashcard/design-system'

export const NewPageButton = styled(Button, {
  color: theme.colors.typeSecondary,
  display: 'flex',
  fontSize: theme.fontSizes.subHeadline,
  justifyContent: 'flex-start',
  flex: 1,
  padding: '0.75rem'
})

export const loadingIconCls = css({
  width: 14,
  height: 14,
  marginRight: 6
})()
