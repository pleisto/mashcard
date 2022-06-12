import { MAX_COLOR_SATURATION, MAX_COLOR_VALUE, MAX_COLOR_RGB, MAX_COLOR_ALPHA, RGB } from './rgb'
import { HSL } from './hsl'
import { HSV } from './hsv'
import { Color } from './color'
import { clamp } from './clamp'

/** Converts HSV components to an HSL color. */
export function hsv2hsl(h: number, s: number, v: number): HSL {
  const s2 = s / MAX_COLOR_SATURATION
  const v2 = v / MAX_COLOR_VALUE

  let l = (2 - s2) * v2
  let sl = s2 * v2
  sl /= l <= 1 ? l : 2 - l
  sl = sl || 0
  l /= 2

  return { h, s: Math.round(sl * 100), l: Math.round(l * 100) }
}

/** Converts HSV components to an RGB color. Does not set the alpha value. */
export function hsv2rgb(h: number, s: number, v: number): RGB {
  const s2 = s / 100
  const v2 = v / 100

  let rgb: number[] = []

  const c = v2 * s2
  const hh = h / 60
  const x = c * (1 - Math.abs((hh % 2) - 1))
  const m = v2 - c

  switch (Math.floor(hh)) {
    case 0:
      rgb = [c, x, 0]
      break

    case 1:
      rgb = [x, c, 0]
      break

    case 2:
      rgb = [0, c, x]
      break

    case 3:
      rgb = [0, x, c]
      break

    case 4:
      rgb = [x, 0, c]
      break

    case 5:
      rgb = [c, 0, x]
      break
  }

  return {
    r: Math.round(MAX_COLOR_RGB * (rgb[0] + m)),
    g: Math.round(MAX_COLOR_RGB * (rgb[1] + m)),
    b: Math.round(MAX_COLOR_RGB * (rgb[2] + m))
  }
}

/** Converts HSL components to an HSV color. */
export function hsl2hsv(h: number, s: number, l: number): HSV {
  // eslint-disable-next-line no-param-reassign
  s *= (l < 50 ? l : 100 - l) / 100
  const v = l + s

  return {
    h,
    s: v === 0 ? 0 : ((2 * s) / v) * 100,
    v
  }
}

/** Converts HSL components to an RGB color. Does not set the alpha value. */
export function hsl2rgb(h: number, s: number, l: number): RGB {
  const hsv = hsl2hsv(h, s, l)

  return hsv2rgb(hsv.h, hsv.s, hsv.v)
}

/** Converts RGB components to an HSV color. */
export function rgb2hsv(r: number, g: number, b: number): HSV {
  let h = NaN
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const delta = max - min

  // hue
  if (delta === 0) {
    h = 0
  } else if (r === max) {
    h = ((g - b) / delta) % 6
  } else if (g === max) {
    h = (b - r) / delta + 2
  } else if (b === max) {
    h = (r - g) / delta + 4
  }

  h = Math.round(h * 60)

  if (h < 0) {
    h += 360
  }

  // saturation
  const s = Math.round((max === 0 ? 0 : delta / max) * 100)

  // value
  const v = Math.round((max / MAX_COLOR_RGB) * 100)

  return { h, s, v }
}

/**
 * @internal
 * Converts an RGB component to a 0-padded hex component of length 2. */
function _rgbToPaddedHex(num: number): string {
  const hex = clamp(num, MAX_COLOR_RGB).toString(16)

  return hex.length === 1 ? `0${hex}` : hex
}

/** Converts RGB components to a hex color string (without # prefix). */
export function rgb2hex(r: number, g: number, b: number): string {
  return [_rgbToPaddedHex(r), _rgbToPaddedHex(g), _rgbToPaddedHex(b)].join('')
}

/** Converts hex color string to RGB components. */
export function hex2rgb(hexStr: string): RGB {
  const rgbArray = (
    hexStr
      .replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (m, r, g, b) => `#${r}${r}${g}${g}${b}${b}`)
      .substring(1)
      .match(/.{2}/g) ?? []
  ).map(x => parseInt(x, 16))

  return {
    r: rgbArray[0],
    g: rgbArray[1],
    b: rgbArray[2]
  }
}

/**
 * @internal
 * Get a CSS color string from some color components.
 * If `a` is specified and not 100, returns an `rgba()` string.
 * Otherwise returns `hex` prefixed with #.
 */
// eslint-disable-next-line max-params
function _rgbaOrHexString(r: number, g: number, b: number, a: number | undefined, hex: string): string {
  return a === MAX_COLOR_ALPHA || typeof a !== 'number' ? `#${hex}` : `rgba(${r}, ${g}, ${b}, ${a / MAX_COLOR_ALPHA})`
}

/** Converts an RGBA color to a color object (alpha defaults to 100). */
export function rgb2color(rgba: RGB): Color {
  const { a = MAX_COLOR_ALPHA, b, g, r } = rgba
  const { h, s, v } = rgb2hsv(r, g, b)
  const hex = rgb2hex(r, g, b)
  const str = _rgbaOrHexString(r, g, b, a, hex)
  const t = MAX_COLOR_ALPHA - a

  return { a, b, g, h, hex, r, s, str, v, t }
}

/**
 * Converts a valid CSS color string to an RGB color.
 * Note that hex colors *must* be prefixed with # to be considered valid.
 * Alpha in returned color defaults to 100.
 * Four and eight digit hex values (with alpha) are supported if the current browser supports them.
 */
export function cssStr2color(colorStr: string): Color | undefined {
  let rgb: RGB | undefined
  switch (true) {
    case colorStr.startsWith('#'):
      rgb = hex2rgb(colorStr)
      break
    case colorStr.startsWith('rgb'): {
      const match = colorStr.match(/^rgb(a?)\(([\d., ]+)\)$/) ?? []
      const hasAlpha = !!match[1]
      const parts = match[2].split(/ *, */).map(Number)
      rgb = {
        r: parts[0],
        g: parts[1],
        b: parts[2],
        a: hasAlpha ? parts[3] * 100 : MAX_COLOR_ALPHA
      }
      break
    }
    case colorStr.startsWith('hsl'): {
      const match = colorStr.match(/^hsl(a?)\(([\d., ]+)\)$/) ?? []
      const hasAlpha = !!match[1]
      const parts = match[2].split(/ *, */).map(Number)
      rgb = hsl2rgb(parts[0], parts[1], parts[2])
      rgb.a = hasAlpha ? parts[3] * 100 : MAX_COLOR_ALPHA
      break
    }
    default:
      rgb = undefined
      break
  }
  return rgb === undefined ? undefined : rgb2color(rgb)
}

export function color2cssStr(color: Color): string {
  return color.a === 100 ? color.str : `rgba(${color.r}, ${color.g}, ${color.b}, ${(color.a ?? 0) / 100})`
}
