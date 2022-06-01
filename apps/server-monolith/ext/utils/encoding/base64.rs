use crate::utils::ffi::{rstring_to_vec, vec_to_rstring};
use base64_simd::Base64;
use magnus::{
    exception, function,
    module::RModule,
    scan_args::{get_kwargs, scan_args},
    Error, Module, RString, Value,
};

/// Returns the Base64-encoded version of bin. This method complies with RFC 4648.
/// No line feeds are added.
fn strict_encode64(input: RString) -> String {
    Base64::STANDARD
        .encode_to_boxed_str(&rstring_to_vec(input))
        .to_string()
}

fn strict_decode64(input: String) -> Result<RString, Error> {
    Base64::STANDARD
        .decode_to_boxed_bytes(input.as_bytes())
        .map_err(|_| Error::new(exception::arg_error(), "Invalid Base64 string"))
        .map(|v| vec_to_rstring(v.into_vec()))
}

/// Returns the Base64-encoded version of bin.
/// This method complies with “Base 64 Encoding with URL and Filename Safe Alphabet'' in RFC 4648.
/// The alphabet uses '-' instead of '+' and '_' instead of '/'. Note that the result can still contain '='.
/// You can remove the padding by setting padding as false.
fn urlsafe_encode64(args: &[Value]) -> Result<String, Error> {
    let args = scan_args(args)?;
    let (input,): (RString,) = args.required;
    let _: () = args.optional;
    let _: () = args.splat;
    let _: () = args.trailing;
    let _: () = args.block;
    let kw = get_kwargs::<_, (), (Option<bool>,), ()>(args.keywords, &[], &["padding"])?;
    let (padding,): (Option<bool>,) = kw.optional;
    let encoder = match padding {
        Some(true) => Base64::URL_SAFE,
        Some(false) => Base64::URL_SAFE_NO_PAD,
        None => Base64::URL_SAFE, // default
    };
    Ok(encoder
        .encode_to_boxed_str(&rstring_to_vec(input))
        .to_string())
}

fn urlsafe_decode64(input: String) -> Result<RString, Error> {
    let encode = if input.contains('=') {
        Base64::URL_SAFE
    } else {
        Base64::URL_SAFE_NO_PAD
    };
    encode
        .decode_to_boxed_bytes(input.as_bytes())
        .map_err(|_| Error::new(exception::arg_error(), "Invalid Base64 string"))
        .map(|v| vec_to_rstring(v.into_vec()))
}

pub fn init(parent: RModule) -> Result<(), Error> {
    let module = parent.define_module("Base64")?;
    module.define_module_function("strict_encode64", function!(strict_encode64, 1))?;
    module.define_module_function("strict_decode64", function!(strict_decode64, 1))?;
    module.define_module_function("urlsafe_encode64", function!(urlsafe_encode64, -1))?;
    module.define_module_function("urlsafe_decode64", function!(urlsafe_decode64, 1))?;
    Ok(())
}
