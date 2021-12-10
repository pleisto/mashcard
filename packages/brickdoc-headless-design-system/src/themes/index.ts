import { createStitches } from '@stitches/react'
import { ceramicLightTheme } from './ceramic-light'

/**
 * Register default theme here
 */
export const { theme, css, styled, config, globalCss, keyframes } = createStitches({
  prefix: 'brd',
  theme: ceramicLightTheme
})

/**
 * Register other themes here
 *
 * @example
 * `export const ceramicDark = createTheme(ceramicDarkTheme)`
 */
