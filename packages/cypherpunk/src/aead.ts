import { Buffer } from 'buffer'
import { string2Buffer, fixedLengthBuffer } from './utils'
import {
  crypto_aead_xchacha20poly1305_ietf_encrypt,
  crypto_aead_xchacha20poly1305_ietf_decrypt,
  crypto_aead_xchacha20poly1305_ietf_ABYTES,
  crypto_aead_xchacha20poly1305_ietf_NPUBBYTES,
  crypto_aead_xchacha20poly1305_ietf_KEYBYTES,
  randombytes_buf
} from 'sodium-native'

const split = '$'

/**
 * Encrypts a message using XChaCha20-Poly1305-IETF
 * @param plaintext - plaintext
 * @param key - encryption key
 * @returns ciphertext - base64 encoded nonce + ciphertext
 */
export function aeadEncrypt(plaintext: string, key: string): string {
  // message
  const m = string2Buffer(plaintext)
  // result(c)
  const c = Buffer.alloc(m.length + crypto_aead_xchacha20poly1305_ietf_ABYTES)
  // nonce
  const npub = Buffer.alloc(crypto_aead_xchacha20poly1305_ietf_NPUBBYTES)
  randombytes_buf(npub)
  // key
  const k = fixedLengthBuffer(key, crypto_aead_xchacha20poly1305_ietf_KEYBYTES)
  crypto_aead_xchacha20poly1305_ietf_encrypt(c, m, null, null, npub, k)
  return [npub.toString('base64'), c.toString('base64')].join(split)
}

/**
 * Decrypts a message using XChaCha20-Poly1305-IETF
 * @param nonce - base64 encoded nonce
 * @param ciphertext - base64 encoded ciphertext
 * @param key - encryption key
 * @returns - plaintext
 */
export function aeadDecrypt(ciphertext: string, key: string): string {
  const [nonce, cipher] = ciphertext.split(split)
  // ciphertext
  const c = string2Buffer(cipher, 'base64')
  // result(m)
  const m = Buffer.alloc(c.length - crypto_aead_xchacha20poly1305_ietf_ABYTES)
  // nonce
  const npub = string2Buffer(nonce, 'base64')
  // key
  const k = fixedLengthBuffer(key, crypto_aead_xchacha20poly1305_ietf_KEYBYTES)
  crypto_aead_xchacha20poly1305_ietf_decrypt(m, null, c, null, npub, k)
  return m.toString()
}
