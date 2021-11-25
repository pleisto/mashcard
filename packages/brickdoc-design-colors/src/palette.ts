import { Color } from './color'
import { MAX_COLOR_RGB } from './rgb'
import { HSV } from './hsv'
import { hsv2hsl, hsv2rgb, rgb2color, cssStr2color, color2cssStr } from './converter'
import { clamp } from './clamp'

// Soften: to get closer to the background color's luminance
// (softening with a white background would be lightening, with black it'd be darkening)
// Strongen: opposite of soften

// Luminance multiplier constants for generating shades of a given color
export const WhiteShadeTableBG = [0.027, 0.043, 0.082, 0.145, 0.184, 0.216, 0.349, 0.537] // white bg
export const BlackTintTableBG = [0.537, 0.45, 0.349, 0.216, 0.184, 0.145, 0.082, 0.043] // black bg
export const WhiteShadeTable = [0.537, 0.349, 0.216, 0.184, 0.145, 0.082, 0.043, 0.027] // white fg
export const BlackTintTable = [0.537, 0.45, 0.349, 0.216, 0.184, 0.145, 0.082, 0.043] // black fg
export const LumTintTable = [0.88, 0.77, 0.66, 0.55, 0.44, 0.33, 0.22, 0.11] // light (strongen all)
export const LumShadeTable = [0.11, 0.22, 0.33, 0.44, 0.55, 0.66, 0.77, 0.88] // dark (soften all)
export const ColorTintTable = [0.96, 0.84, 0.7, 0.4, 0.12] // default soften
export const ColorShadeTable = [0.1, 0.24, 0.44] // default strongen

// If the given shade's luminance is below/above these values, we'll swap to using the White/Black tables above
export const LowLuminanceThreshold = 0.2
export const HighLuminanceThreshold = 0.8

// Shades of a given color, from softest to strongest
export enum Shade {
  Shade1 = 1,
  Shade2 = 2,
  Shade3 = 3,
  Shade4 = 4,
  Shade5 = 5,
  Shade6 = 6,
  Shade7 = 7,
  Shade8 = 8
}

/**
 * Returns true if the argument is a valid Shade value
 * @param shade - The Shade value to validate.
 */
export function isValidShade(shade?: Shade): boolean {
  return typeof shade === 'number' && shade >= Shade.Shade1 && shade <= Shade.Shade8
}

function _isBlack(color: Color): boolean {
  return color.r === 0 && color.g === 0 && color.b === 0
}

function _isWhite(color: Color): boolean {
  return color.r === MAX_COLOR_RGB && color.g === MAX_COLOR_RGB && color.b === MAX_COLOR_RGB
}

function _darken(hsv: HSV, factor: number): HSV {
  return {
    h: hsv.h,
    s: hsv.s,
    v: clamp(hsv.v - hsv.v * factor, 100, 0)
  }
}

function _lighten(hsv: HSV, factor: number): HSV {
  return {
    h: hsv.h,
    s: clamp(hsv.s - hsv.s * factor, 100, 0),
    v: clamp(hsv.v + (100 - hsv.v) * factor, 100, 0)
  }
}

export function isDark(color: Color): boolean {
  return hsv2hsl(color.h, color.s, color.v).l < 50
}

/**
 * Given a color and a shade specification, generates the requested shade of the color.
 * Logic:
 * if white
 *  darken via tables defined above
 * if black
 *  lighten
 * if light
 *  strongen
 * if dark
 *  soften
 * else default
 *  soften or strongen depending on shade#
 * @param color - The base color whose shade is to be computed
 * @param shade - The shade of the base color to compute
 * @param isInverted - Default false. Whether the given theme is inverted (reverse strongen/soften logic)
 */
export function colorWithShade(color: Color, shade: Shade, isInverted: boolean = false): Color | null {
  if (!color) {
    return null
  }

  if (!isValidShade(shade)) {
    console.warn(`[@brickdoc/design-colors] valid shade: ${shade} type: ${typeof shade}`)
    return color
  }

  const hsl = hsv2hsl(color.h, color.s, color.v)
  let hsv = { h: color.h, s: color.s, v: color.v }
  const tableIndex = shade - 1
  let _soften = _lighten
  let _strongen = _darken
  if (isInverted) {
    _soften = _darken
    _strongen = _lighten
  }
  if (_isWhite(color)) {
    // white
    hsv = _darken(hsv, WhiteShadeTable[tableIndex])
  } else if (_isBlack(color)) {
    // black
    hsv = _lighten(hsv, BlackTintTable[tableIndex])
  } else if (hsl.l / 100 > HighLuminanceThreshold) {
    // light
    hsv = _strongen(hsv, LumShadeTable[tableIndex])
  } else if (hsl.l / 100 < LowLuminanceThreshold) {
    // dark
    hsv = _soften(hsv, LumTintTable[tableIndex])
  } else if (tableIndex < ColorTintTable.length) {
    hsv = _soften(hsv, ColorTintTable[tableIndex])
  } else {
    hsv = _strongen(hsv, ColorShadeTable[tableIndex - ColorTintTable.length])
  }

  return rgb2color(Object.assign(hsv2rgb(hsv.h, hsv.s, hsv.v), { a: color.a }))
}

export function colorShadeMixin(colorStr: string, shade: string, isInverted = 'false'): string | null {
  const color = cssStr2color(colorStr)
  if (!color) return ''
  const shadedColor = colorWithShade(color, parseInt(shade, 10), isInverted === 'true')
  return !shadedColor ? null : color2cssStr(shadedColor)
}

export function colorShadeMixinString(colorStr: string, shade: string, isInverted = 'false'): string {
  const color = cssStr2color(colorStr)
  if (!color) return ''
  const shadedColor = colorWithShade(color, parseInt(shade, 10), isInverted === 'true')
  return !shadedColor ? '' : color2cssStr(shadedColor)
}

export function generatePalette(color: string, isInverted = false): string[] {
  const baseColor = cssStr2color(color)
  const colors = []

  if (!baseColor) return []

  colors[0] = colorWithShade(baseColor, Shade.Shade1, isInverted)
  colors[1] = colorWithShade(baseColor, Shade.Shade2, isInverted)
  colors[2] = colorWithShade(baseColor, Shade.Shade3, isInverted)
  colors[3] = colorWithShade(baseColor, Shade.Shade4, isInverted)
  colors[4] = colorWithShade(baseColor, Shade.Shade5, isInverted)
  colors[5] = baseColor
  colors[6] = colorWithShade(baseColor, Shade.Shade6, isInverted)
  colors[7] = colorWithShade(baseColor, Shade.Shade7, isInverted)
  colors[8] = colorWithShade(baseColor, Shade.Shade8, isInverted)
  return colors.map(color => (color ? color2cssStr(color) : ''))
}
