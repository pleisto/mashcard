import { theme } from '../../../themes'
export const size = {
  sm: {
    padding: `${theme.space.xxs} ${theme.space.sm}`,
    lineHeight: theme.lineHeights.callout,
    fontSize: theme.fontSizes.callout,
    minWidth: '.85rem'
  },
  md: {
    padding: `${theme.space.xs} ${theme.space.lg}`,
    lineHeight: theme.lineHeights.subHeadline,
    fontSize: theme.fontSizes.subHeadline,
    minWidth: theme.space.xl
  },
  lg: {
    padding: `${theme.space.sm} ${theme.space.lg}`,
    lineHeight: theme.lineHeights.body,
    fontSize: theme.fontSizes.body,
    minWidth: theme.space.xxl
  }
}
