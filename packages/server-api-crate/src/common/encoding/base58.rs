use napi::bindgen_prelude::*;
use napi_derive::napi;

/// Base58 encoding (Bitcoin style)
/// @param input string or buffer
/// @returns base58 encoded string
#[napi]
pub fn base58_encode(input: Either<String, Buffer>) -> String {
  bs58::encode(match input {
    Either::A(ref s) => s.as_bytes(),
    Either::B(ref b) => b.as_ref(),
  })
  .into_string()
}

/// Base58 decoding (Bitcoin style)
/// @param input base58 encoded string
/// @returns decoded buffer
#[napi]
pub fn base58_decode(input: String) -> Result<Buffer> {
  bs58::decode(input)
    .into_vec()
    .map_err(|e| napi::Error::new(napi::Status::GenericFailure, e.to_string()))
    .map(Buffer::from)
}
