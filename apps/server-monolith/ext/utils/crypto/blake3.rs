use crate::utils::ffi::rstring_to_vec;
use hex::{FromHex, ToHex};
use magnus::{exception, function, module::RModule, Error, Module, RString};
use rand::Rng;
use rand_chacha::rand_core::SeedableRng;

/// Computes a fixed-length fingerprint of a string.
/// Suitable for most use cases other than hashing passwords.
fn hash(data: RString) -> String {
    blake3::hash(&rstring_to_vec(data)).to_string()
}

/// Computes a fixed-length fingerprint of a string with a salt.
// Suitable for most use cases other than hashing passwords.
fn salted_hash(data: RString, salt: String) -> Result<String, Error> {
    <[u8; blake3::KEY_LEN]>::from_hex(salt)
        .map(|key| {
            blake3::keyed_hash(&key, &rstring_to_vec(data))
                .to_hex()
                .to_string()
        })
        .map_err(|e| Error::new(exception::arg_error(), format!("Invalid key: {}", e)))
}

/// Generate context for key derivation.
/// sub_key_id and context compatible with libsodium's kdf function.
fn gen_context(sub_key_id: u32, context: Option<String>) -> String {
    let sub_key = format!("[subKeyId={sub_key_id}]");
    match context {
        Some(c) => format!("{sub_key} [extra={c}]"),
        None => sub_key,
    }
}

/// Derive a new key from a master key.
/// @param keySeed - master key
/// @param subKeyId - sub key id
/// @param context - It don't have to be secret and can have a low entropy
fn derive_key(key_seed: RString, sub_key_id: u32, extra_context: Option<String>) -> String {
    let ctx = gen_context(sub_key_id, extra_context);
    let seed = rstring_to_vec(key_seed);
    blake3::derive_key(&ctx, &seed).encode_hex()
}

/// Generate a new master key.
/// @returns hex encoded string
fn generate_key() -> String {
    let seed = rand_chacha::ChaCha8Rng::from_entropy().gen::<[u8; blake3::KEY_LEN]>();
    blake3::derive_key("[extra=generateKey()]", &seed).encode_hex()
}

pub fn init(parent: RModule) -> Result<(), Error> {
    let module = parent.define_module("Blake3")?;
    module.define_module_function("hash", function!(hash, 1))?;
    module.define_module_function("salted_hash", function!(salted_hash, 2))?;
    module.define_module_function("derive_key", function!(derive_key, 3))?;
    module.define_module_function("generate_key", function!(generate_key, 0))?;
    Ok(())
}
