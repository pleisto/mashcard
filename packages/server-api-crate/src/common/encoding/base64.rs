use napi::bindgen_prelude::*;
use napi_derive::napi;

/// Base64 encoding (url safe)
/// @param input string or buffer
/// @returns base64 encoded string
#[napi(js_name = "base64UrlSafeEncode")]
pub fn js_base64_url_safe_encode(input: Either<String, Buffer>) -> String {
  url_safe_encode(match input {
    Either::A(ref s) => s.as_bytes(),
    Either::B(ref b) => b.as_ref(),
  })
}

/// Base64 decoding (url safe)
/// @param input base64 encoded string
/// @returns decoded buffer
#[napi(js_name = "base64UrlSafeDecode")]
pub fn js_base64_url_safe_decode(input: String) -> Result<Buffer> {
  url_safe_decode(input)
    .map_err(|e| Error::new(Status::GenericFailure, e.to_string()))
    .map(Buffer::from)
}

/// Base64 encoding (url safe)
pub fn url_safe_encode<T: AsRef<[u8]>>(input: T) -> String {
  base64::encode_config(input, base64::URL_SAFE_NO_PAD)
}

/// Base64 decoding (url safe)
pub fn url_safe_decode<T: AsRef<[u8]>>(
  input: T,
) -> std::result::Result<Vec<u8>, base64::DecodeError> {
  base64::decode_config(input, base64::URL_SAFE_NO_PAD)
}
