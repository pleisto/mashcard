import { createStitches } from '@stitches/react'
import { ceramicLightTheme } from './ceramic-light'
import { globalStyleSheet } from './common/globalStyle.style'
/**
 * Register default theme here
 */
export const { theme, css, styled, config, globalCss, keyframes } = createStitches({
  prefix: 'brd',
  theme: ceramicLightTheme
})

export const globalStyle = globalCss(globalStyleSheet as Record<string, any>)

/**
 * Register other themes here
 *
 * @example
 * `export const ceramicDark = createTheme(ceramicDarkTheme)`
 */
