use magnus::{module::RModule, Error, Module};
mod crypto;
pub mod encoding;
mod ffi;
mod json_schema;
mod mjml;
mod pod;
mod user_agent;

pub fn init(parent: RModule) -> Result<(), Error> {
    let module = parent.define_module("Utils")?;
    encoding::init(module)?;
    crypto::init(module)?;
    user_agent::init(module)?;
    json_schema::init(module)?;
    mjml::init(module)?;
    pod::init(module)?;
    Ok(())
}
