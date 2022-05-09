use chacha20poly1305::aead::{Aead, NewAead};
use chacha20poly1305::{Key, XChaCha20Poly1305, XNonce};
use hex::FromHex;
use napi::bindgen_prelude::*;
use napi_derive::napi;
use rand::Rng;
use rand_chacha::rand_core::SeedableRng;

/// Char `|` not included in ZeroMQ RFC32 alphabet.
/// So it is safe to use it as a separator.
const Z85_SAFE_SEPARATOR: &str = "|";

fn xchacha20_cipher(key: String) -> Result<XChaCha20Poly1305> {
  <[u8; 32]>::from_hex(key)
    .map_err(|e| Error::new(Status::InvalidArg, format!("Invalid key: {}", e)))
    .map(|key| XChaCha20Poly1305::new(Key::from_slice(key.as_ref())))
}

/// Encrypts a message using XChaCha20-Poly1305-IETF
/// @param plain - plaintext
/// @param key - 32bytes encryption key
/// @returns ciphertext - z85 encoded ciphertext with nonce
#[napi]
pub fn aead_encrypt(plain: Either<String, Buffer>, key: String) -> Result<String> {
  let rand = rand_chacha::ChaCha8Rng::from_entropy().gen::<[u8; 24]>();
  let nonce = XNonce::from_slice(&rand);
  let plain_buf = match plain {
    Either::A(s) => s.as_bytes().to_vec(),
    Either::B(b) => b.to_vec(),
  };
  xchacha20_cipher(key)?
    .encrypt(nonce, &plain_buf[..])
    .map_err(|e| Error::new(Status::GenericFailure, format!("Error encrypt: {}", e)))
    .map(|c| {
      let cipher = z85::encode(c);
      let nonce = z85::encode(nonce);
      format!("{}{}{}", nonce, Z85_SAFE_SEPARATOR, cipher)
    })
}

/// Decrypts a message using XChaCha20-Poly1305-IETF
/// @param cipher - z85 encoded ciphertext with nonce
/// @param key - 32bytes encryption key
/// @returns plaintext buffer
#[napi]
pub fn aead_decrypt(cipher: String, key: String) -> Result<Buffer> {
  let cipher_parts: Vec<&str> = cipher.split(Z85_SAFE_SEPARATOR).collect();
  if cipher_parts.len() != 2 {
    return Err(Error::new(
      Status::InvalidArg,
      "Invalid ciphertext".to_string(),
    ));
  };
  let nonce = z85::decode(cipher_parts[0])
    .map_err(|e| Error::new(Status::InvalidArg, format!("Invalid nonce in input: {}", e)))?;
  let cipher = z85::decode(cipher_parts[1]).map_err(|e| {
    Error::new(
      Status::InvalidArg,
      format!("Invalid ciphertext in input: {}", e),
    )
  })?;
  xchacha20_cipher(key)?
    .decrypt(XNonce::from_slice(&nonce), cipher.as_ref())
    .map_err(|e| Error::new(Status::GenericFailure, format!("Error decrypt: {}", e)))
    .map(Buffer::from)
}
