import { createStitches } from '@stitches/react'
import { Colors } from './colors'
import { Palette } from './palette'
import { Spacing } from './spacing'
import { FontSizes } from './fontSizes'
import { Transitions } from './transitions'
import { Shadows } from './shadows'

export const { styled, css, theme } = createStitches({
  prefix: 'brk',
  theme: {
    colors: Palette(Colors),
    space: Spacing,
    fontSizes: FontSizes,
    fonts: {
      untitled: 'Untitled Sans, apple-system, sans-serif',
      mono: 'Söhne Mono, menlo, monospace'
    },
    fontWeights: {},
    lineHeights: Spacing,
    letterSpacings: {},
    sizes: Spacing,
    borderWidths: {},
    borderStyles: {},
    radii: Spacing,
    shadows: Shadows,
    zIndices: {},
    transitions: Transitions
  }
})
