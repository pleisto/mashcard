use magnus::{module::RModule, Error, Module};
mod encoding;

pub fn init(parent: RModule) -> Result<(), Error> {
    let module = parent.define_module("Utils")?;
    encoding::init(module)?;
    Ok(())
}
