use magnus::{module::RModule, Error, Module};

mod base58;
mod base64;
pub mod uuid;
mod z85;

pub fn init(parent: RModule) -> Result<(), Error> {
    let module = parent.define_module("Encoding")?;
    base58::init(module)?;
    base64::init(module)?;
    z85::init(module)?;
    uuid::init(module)?;
    Ok(())
}
