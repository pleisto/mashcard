use crate::utils::ffi::{rstring_to_vec, vec_to_rstring};
use magnus::{exception, function, module::RModule, Error, Module, RString};

/// Z85 encoding
fn encode(input: RString) -> String {
    z85::encode(rstring_to_vec(input).unwrap_or_default())
}

/// Z85 decoding
fn decode(input: String) -> Result<RString, Error> {
    z85::decode(input)
        .map_err(|e| Error::new(exception::arg_error(), e.to_string()))
        .map(|v| vec_to_rstring(v.to_vec()))
}

pub fn init(parent: RModule) -> Result<(), Error> {
    let module = parent.define_module("Z85")?;
    module.define_module_function("encode", function!(encode, 1))?;
    module.define_module_function("decode", function!(decode, 1))?;
    Ok(())
}
