use magnus::{module::RModule, Error, Module};
mod crypto;
mod encoding;
mod ffi;
mod user_agent;

pub fn init(parent: RModule) -> Result<(), Error> {
    let module = parent.define_module("Utils")?;
    encoding::init(module)?;
    crypto::init(module)?;
    user_agent::init(module)?;
    Ok(())
}
