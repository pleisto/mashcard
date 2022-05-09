use napi::bindgen_prelude::*;
use napi_derive::napi;

/// Z85 encoding
/// @param input string or buffer
/// @returns z85 encoded string
#[napi]
pub fn z85_encode(input: Either<String, Buffer>) -> String {
  z85::encode(match input {
    Either::A(ref s) => s.as_bytes(),
    Either::B(ref b) => b.as_ref(),
  })
}

/// Z85 decoding
/// @param input z85 encoded string
/// @returns decoded buffer
#[napi]
pub fn z85_decode(input: String) -> Result<Buffer> {
  z85::decode(input)
    .map_err(|e| Error::new(Status::GenericFailure, e.to_string()))
    .map(Buffer::from)
}
