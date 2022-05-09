use hex::{FromHex, ToHex};
use napi::bindgen_prelude::*;
use napi_derive::napi;
use rand::Rng;
use rand_chacha::rand_core::SeedableRng;

/// Computes a fixed-length fingerprint of a string.
/// Suitable for most use cases other than hashing passwords.
/// @param data Message String or Buffer to hash.
/// @param salt 32 bytes hex string. (string length must be 64)
/// @returns hex string
#[napi(ts_args_type = "data: string | Buffer, salt?: string")]
pub fn generic_hash(data: Either<String, Buffer>, salt: Either<String, ()>) -> Result<String> {
  match data {
    Either::A(s) => blake3_hash_str(s.as_bytes(), salt),
    Either::B(b) => blake3_hash_str(b.as_ref(), salt),
  }
}

fn blake3_hash_str(input: &[u8], salt: Either<String, ()>) -> Result<String> {
  match salt {
    Either::A(salt) => <[u8; blake3::KEY_LEN]>::from_hex(salt)
      .map(|key| blake3::keyed_hash(&key, input).to_hex().to_string())
      .map_err(|e| Error::new(Status::GenericFailure, format!("Error salt: {}", e))),
    Either::B(_) => Ok(blake3::hash(input).to_string()),
  }
}

/// Derive a new key from a master key.
/// @param keySeed - master key
/// @param subKeyId - sub key id
/// @param context - It don't have to be secret and can have a low entropy
#[napi(ts_args_type = "keySeed: string | Buffer, subKeyId: number, context?: string")]
pub fn derive_key(
  key_seed: Either<String, Buffer>,
  sub_key_id: u32,
  extra_context: Either<String, ()>,
) -> String {
  let ctx = gen_context(sub_key_id, extra_context);
  let seed = match key_seed {
    Either::A(s) => s.as_bytes().to_vec(),
    Either::B(b) => b.to_vec(),
  };
  blake3::derive_key(&ctx, &seed).encode_hex()
}

/// Generate context for key derivation.
/// sub_key_id and context compatible with libsodium's kdf function.
fn gen_context(sub_key_id: u32, context: Either<String, ()>) -> String {
  let sub_key = format!("[subKeyId={}]", sub_key_id);
  match context {
    Either::A(c) => format!("{} [extra={}]", sub_key, c),
    Either::B(_) => sub_key,
  }
}

/// Generate a new master key.
/// @returns hex encoded string
#[napi]
pub fn generate_key() -> String {
  let seed = rand_chacha::ChaCha8Rng::from_entropy().gen::<[u8; blake3::KEY_LEN]>();
  blake3::derive_key("[extra=generateKey()]", &seed).encode_hex()
}
