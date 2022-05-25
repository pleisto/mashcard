/// Provide some helper functions for Rust FFI
use magnus::{
    encoding::{self, EncodingCapable, RbEncoding},
    exception, Error, RString,
};

/// covert a ruby string to vec
/// Returns Error if the encoding is not UTF-8 or ascii-8bit
pub fn rstring_to_vec(str: RString) -> Result<Vec<u8>, Error> {
    let enc = str.enc_get();
    if enc == encoding::Index::utf8() {
        // This string has been validated as UTF-8, so `unwrap` is safe
        Ok(str.to_string().unwrap().as_bytes().to_vec())
    } else if enc == encoding::Index::ascii8bit() {
        // This is directly viewing memory owned and managed by Ruby.
        // Ruby may modify or free the memory backing the returned slice.
        // So we use `to_vec` to make a copy.
        unsafe { Ok(str.as_slice().to_vec()) }
    } else {
        // We are not prepared to support legacy encodings such as EUC-JP or GBK.
        Err(Error::new(
            exception::encoding_error(),
            "Unsupported encoding",
        ))
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
