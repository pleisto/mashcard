use any_ascii::any_ascii;
use napi_derive::napi;
use std::time::{SystemTime, UNIX_EPOCH};

/// Generate a slug based on the User Name
/// @param input UserName
/// @returns slugs
#[napi(ts_return_type = "[preferred: string, alternative: string]")]
pub fn gen_slug(name: String) -> Vec<String> {
  let preferred = any_ascii(&name)
    .replace(|ch: char| !ch.is_alphanumeric(), "")
    .to_lowercase();
  let timestamp = SystemTime::now()
    .duration_since(UNIX_EPOCH)
    .unwrap()
    .as_millis();
  let alternative = format!("{preferred}-{}", radix_fmt::radix_36(timestamp / 100));
  vec![preferred, alternative]
}
