use any_ascii::any_ascii;
use napi_derive::napi;

/// AnyAscii provides ASCII-only replacement strings for practically
/// all Unicode characters.
/// @param input Any unicode string
/// @returns ASCII-only string
#[napi(js_name = "anyAscii")]
pub fn js_any_ascii(input: String) -> String {
  any_ascii(&input)
}
