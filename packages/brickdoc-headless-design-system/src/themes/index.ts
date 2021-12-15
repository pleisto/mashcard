import { createStitches } from '@stitches/react'
import { mixins } from 'stitches-mixins'
import { ceramicLightTheme, ceramicLightMixins } from './ceramic-light'
import { globalStyleSheet } from './common/globalStyle.style'
import { commonUtils } from './common/utils'
import { commonMixins } from './common/mixins'

/**
 * For Storybook
 */
export const utils = {
  ...commonUtils,
  mixins: {
    ...commonMixins,
    ...ceramicLightMixins
  }
}

/**
 * Register default theme here
 */
export const { theme, css, styled, config, globalCss, keyframes } = createStitches({
  prefix: 'brd',
  theme: ceramicLightTheme,
  utils: {
    ...commonUtils,
    include: mixins({
      ...commonMixins,
      ...ceramicLightMixins
    })
  }
})

export const globalStyle = globalCss(globalStyleSheet as Record<string, any>)
export { globalStyleSheet }
/**
 * Register other themes here
 *
 * @example
 * `export const ceramicDark = createTheme(ceramicDarkTheme)`
 */
