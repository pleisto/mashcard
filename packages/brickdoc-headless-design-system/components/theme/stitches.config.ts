import { createStitches } from '@stitches/react'
import { Colors } from './colors'
import { Spacing } from './spacing'
import { FontSizes } from './fontSizes'
import { Transitions } from './transitions'

export const { styled, css, theme } = createStitches({
  prefix: 'brk',
  theme: {
    colors: Colors,
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
    shadows: {},
    zIndices: {},
    transitions: Transitions
  }
})
