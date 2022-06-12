// Inspired by https://github.com/vercel/ms/
import { isNumber, isString } from './isType'
const k = 1000
const bit = 1
const b = bit * 8 // bytes
const kb = b * k
const mb = kb * k
const gb = mb * k
const tb = gb * k
const pb = tb * k
const eb = pb * k

type Unit =
  | 'EB'
  | 'Exabytes'
  | 'Exabyte'
  | 'PB'
  | 'Petabytes'
  | 'Petabyte'
  | 'TB'
  | 'Terabytes'
  | 'Terabyte'
  | 'GB'
  | 'Gigabytes'
  | 'Gigabyte'
  | 'MB'
  | 'Megabytes'
  | 'Megabyte'
  | 'KB'
  | 'Kilobytes'
  | 'Kilobyte'
  | 'B'
  | 'Bytes'
  | 'Byte'
  | 'Bits'
  | 'Bit'

type UnitAnyCase = Unit | Uppercase<Unit> | Lowercase<Unit>

export type StringValue = `${number}` | `${number}${UnitAnyCase}` | `${number} ${UnitAnyCase}`

/**
 * Easily convert between storage size units.
 *
 * NOTICE: we use base 10 instead of base 2 for bit
 * @see [IEC 60027-2 A.2 and ISO/IEC 80000]{@link https://en.wikipedia.org/wiki/Binary_prefix#IEC_prefixes}
 *
 * @example
 * byteSize('1.5KB') === 12_000
 * byteSize(32_000_000) === '4 MB'
 * byteSize(byteSize('32 Gigabytes')) === '32 GB'
 */
export function byteSize(value: StringValue): number
export function byteSize(value: number): string
export function byteSize(value: StringValue | number): number | string {
  if (isString(value)) {
    return toBits(value)
  } else if (isNumber(value)) {
    return toReadable(value)
  }
  throw new Error('Value is not a string or number.')
}

/**
 * Parse a string to a bits.
 * @param str
 * @returns bits
 */
// eslint-disable-next-line complexity
function toBits(str: StringValue): number {
  const match =
    /^(-?(?:\d+)?\.?\d+) *(bits?|bytes?|b|kilobytes?|kb|megabytes?|mb|gigabytes?|gb|terabytes?|tb|petabytes?|pb|exabyte?|eb)?$/i.exec(
      str
    )
  if (!match) {
    return NaN
  }
  const n = parseFloat(match[1])
  const type = (match[2] || 'bits').toLowerCase() as Lowercase<Unit>
  switch (type) {
    case 'exabytes':
    case 'exabyte':
    case 'eb':
      return n * eb
    case 'petabytes':
    case 'petabyte':
    case 'pb':
      return n * pb
    case 'terabytes':
    case 'terabyte':
    case 'tb':
      return n * tb
    case 'gigabytes':
    case 'gigabyte':
    case 'gb':
      return n * gb
    case 'megabytes':
    case 'megabyte':
    case 'mb':
      return n * mb
    case 'kilobytes':
    case 'kilobyte':
    case 'kb':
      return n * kb
    case 'bytes':
    case 'byte':
    case 'b':
      return n * b
    case 'bits':
    case 'bit':
      return n * bit
    default:
      throw new Error(`The unit ${type as string} was matched, but no matching case exists.`)
  }
}

/**
 * Convert a bits to a readable string.
 * @param bits
 * @returns readable string
 */
function toReadable(bits: number): string {
  if (bits < 0) throw new Error('Negative values are not supported.')
  if (bits >= eb) return `${Math.round(bits / eb)} EB`
  if (bits >= pb) return `${Math.round(bits / pb)} PB`
  if (bits >= tb) return `${Math.round(bits / tb)} TB`
  if (bits >= gb) return `${Math.round(bits / gb)} GB`
  if (bits >= mb) return `${Math.round(bits / mb)} MB`
  if (bits >= kb) return `${Math.round(bits / kb)} KB`
  if (bits >= b) return `${Math.round(bits / b)} B`
  return `${bits} Bits`
}
