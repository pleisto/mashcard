import { theme } from '../../../theme'
export const size = {
  small: {
    padding: `${theme.space['2xs']} ${theme.space.sm}`,
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
    lineHeight: theme.space['2xl'],
    minWidth: theme.space['2xl']
  }
}
