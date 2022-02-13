import { string2Buffer, fixedLengthBuffer } from './utils'
import { hash, keyedHash } from 'blake3'

/**
 * Computes a fixed-length fingerprint of a string.
 * Suitable for most use cases other than hashing passwords.
 * @param input Message String
 * @param salt Hash salt
 * @param outputLength Output length, default is 32 bytes.
 * @returns hex string
 */
export function genericHash(input: string, salt?: string, outputLength: number = 32): string {
  const inputBuffer = string2Buffer(input)
  const options = { length: outputLength }
  const outBuffer =
    salt === undefined ? hash(inputBuffer, options) : keyedHash(fixedLengthBuffer(salt, 32), inputBuffer, options)
  return outBuffer.toString('hex')
}
