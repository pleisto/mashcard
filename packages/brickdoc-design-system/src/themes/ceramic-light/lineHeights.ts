import { rem } from 'polished'

/*
 * @example: rem(2) =>  (2px / 16px = 0.125)rem
 */
export const lineHeights = {
  footnote: rem(16),
  callout: rem(18),
  subHeadline: rem(22),
  body: rem(24),
  title5: rem(28),
  title4: rem(30),
  title3: rem(36),
  title2: rem(46),
  title1: rem(54),
  largeTitle: rem(72),
  superTitle: rem(96)
}
