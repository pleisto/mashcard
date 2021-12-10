import { theme } from '../../../themes'
export const size = {
  small: {
    padding: `${theme.space.xxs} ${theme.space.sm}`,
    lineHeight: theme.space.lg,
    minWidth: theme.space.lg
  },
  medium: {
    padding: `${theme.space.xs} ${theme.space.lg}`,
    lineHeight: theme.space.xl,
    minWidth: theme.space.xl
  },
  large: {
    padding: `${theme.space.sm} ${theme.space.lg}`,
    lineHeight: theme.space.xxl,
    minWidth: theme.space.xxl
  }
}
