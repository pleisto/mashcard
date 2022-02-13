import { fixedLengthBuffer } from './utils'
import {
  crypto_kdf_keygen,
  crypto_kdf_derive_from_key,
  crypto_kdf_KEYBYTES,
  crypto_kdf_CONTEXTBYTES
} from 'sodium-native'

/**
 * Generate a new master key.
 * @returns hex encoded string
 */
export function generateKey(): string {
  const key = Buffer.alloc(crypto_kdf_KEYBYTES)
  crypto_kdf_keygen(key)
  return key.toString('hex')
}

/**
 * Derive a new key from a master key.
 * @param key - master key
 * @param subKeyId - sub key id
 * @param context - It don't have to be secret and can have a low entropy
 * @returns
 */
export function deriveKey(key: string, subKeyId: number, context: string = 'unknown'): string {
  const keyBuffer = Buffer.from(key, 'hex')
  const contextBuffer = fixedLengthBuffer(context, crypto_kdf_CONTEXTBYTES)
  const subKeyBuffer = Buffer.alloc(crypto_kdf_KEYBYTES)
  crypto_kdf_derive_from_key(subKeyBuffer, subKeyId, contextBuffer, keyBuffer)
  return subKeyBuffer.toString('hex')
}
