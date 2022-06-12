import { RGB } from './rgb'
import { HSV } from './hsv'

export interface Color extends RGB, HSV {
  /** Hex string for the color (excluding alpha component), *not* prefixed with #. */
  hex: string

  /** CSS color string. If a hex value, it must be prefixed with #. */
  str: string

  /** Transparency value, range 0 (opaque) to 100 (transparent). Usually assumed to be 0 if not specified. */
  t?: number
}
