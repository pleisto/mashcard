/// Provide some helper functions for Rust FFI
use magnus::{
    encoding::{self, EncodingCapable, RbEncoding},
    exception, Error, RString,
};
use serde_json::Value;

/// covert a ruby string to vec
/// Returns Error if the encoding is not UTF-8 or ascii-8bit
pub fn rstring_to_vec(str: RString) -> Vec<u8> {
    let enc = str.enc_get();
    if enc == encoding::Index::utf8() || enc == encoding::Index::usascii() {
        // This string has been validated as UTF-8, so `unwrap` is safe
        str.to_string().unwrap().as_bytes().to_vec()
    } else {
        // This is directly viewing memory owned and managed by Ruby.
        // Ruby may modify or free the memory backing the returned slice.
        // So we use `to_vec` to make a copy.
        unsafe { str.as_slice().to_vec() }
    }
}

/// convert a vec to a ruby string
/// If is not UTF-8 string, it will be converted to ASCII-8BIT(binary)
pub fn vec_to_rstring(vec: Vec<u8>) -> RString {
    let str = RString::from_slice(vec.as_slice());
    if str.is_utf8_compatible_encoding() {
        str.conv_enc(RbEncoding::utf8()).unwrap()
    } else {
        str
    }
}

/// convert a &str to serde_json::Value
/// Returns Ruby Error if the string is not valid JSON
pub fn str_to_json_value(str: &str, arg_name: &str) -> Result<Value, Error> {
    serde_json::from_str(str).map_err(|e| {
        Error::new(
            exception::arg_error(),
            format!("{arg_name} is not invalid JSON: {e}"),
        )
    })
}
