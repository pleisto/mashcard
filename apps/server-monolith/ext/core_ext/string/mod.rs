use any_ascii::any_ascii;
use magnus::{define_class, method, Error, Module};

/// Converts any unicode string to ASCII-only.
fn to_ascii(rb_self: String) -> String {
    any_ascii(&rb_self)
}

pub fn init() -> Result<(), Error> {
    let r_str = define_class("String", Default::default())?;
    r_str.define_method("to_ascii", method!(to_ascii, 0))?;
    Ok(())
}
