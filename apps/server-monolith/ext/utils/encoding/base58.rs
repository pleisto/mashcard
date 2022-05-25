use crate::utils::ffi::{rstring_to_vec, vec_to_rstring};
use magnus::{function, module::RModule, Error, Module, RString};

/// Base58 encoding (Bitcoin style)
fn encode(input: RString) -> String {
    bs58::encode(rstring_to_vec(input).unwrap_or_default()).into_string()
}

/// Base58 decoding (Bitcoin style)
/// Returns None if the input is not a valid base58 string
fn decode(input: String) -> RString {
    vec_to_rstring(bs58::decode(input).into_vec().unwrap_or_default())
}

pub fn init(parent: RModule) -> Result<(), Error> {
    let module = parent.define_module("Base58")?;
    module.define_module_function("encode", function!(encode, 1))?;
    module.define_module_function("decode", function!(decode, 1))?;
    Ok(())
}
