import { rem } from 'polished'

/*
 * @example: rem(2) =>  (2px / 16px = 0.125)rem
 * px to rem
 */
export const space = {
  xxxs: rem(2),
  xxs: rem(4),
  xs: rem(6),
  sm: rem(8),
  md: rem(12),
  lg: rem(16),
  xl: rem(20),
  xxl: rem(24),
  xxxl: rem(32)
}
