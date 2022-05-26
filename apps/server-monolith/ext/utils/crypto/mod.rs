use magnus::{module::RModule, Error, Module};

mod argon2id;
mod blake3;
mod present;

pub fn init(parent: RModule) -> Result<(), Error> {
    let module = parent.define_module("Crypto")?;
    present::init(module)?;
    argon2id::init(module)?;
    blake3::init(module)?;
    Ok(())
}
