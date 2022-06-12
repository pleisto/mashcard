import { styled, theme } from '../../../themes'

export const EmptyRoot = styled('div', {
  display: 'flex',
  flexDirection: 'column'
})
export const EmptyBody = styled('div', {
  display: 'inline-flex',
  include: ['flexCenter']
})
export const EmptyDes = styled('p', {
  margin: 0,
  display: 'inline-flex',
  include: ['flexCenter'],
  color: theme.colors.typeThirdary,
  lineHeight: theme.lineHeights.callout,
  fontSize: theme.fontSizes.callout
})
export const EmptyFooter = styled('div', {
  display: 'flex',
  include: ['flexCenter'],
  paddingTop: 8
})
