import { Buffer } from 'buffer'

export function string2Buffer(str: string, encoding: BufferEncoding = 'utf8'): Buffer {
  return Buffer.from(str, encoding)
}

/**
 * Coverts a string to a fixed-length buffer.
 * If the salt less than `length` bytes, it will be recursively filled.
 * And if the salt more than `length` bytes, it will be truncated to `length` bytes.
 * @param str - input string
 * @param length - fixed length
 * @returns buffer
 */
export function fixedLengthBuffer(str: string, length: number): Buffer {
  const fixedLength = string2Buffer(str)
  if (fixedLength.length === length) {
    return fixedLength
  } else if (fixedLength.length < length) {
    return Buffer.concat([fixedLength, Buffer.alloc(length - fixedLength.length, fixedLength)])
  } else {
    return fixedLength.slice(0, length)
  }
}
