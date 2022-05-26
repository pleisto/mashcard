mod present80;
use magnus::{function, module::RModule, Error, Module};

pub fn init(parent: RModule) -> Result<(), Error> {
    let module = parent.define_module("Present")?;
    module.define_module_function("encrypt", function!(present80::int_encrypt, 2))?;
    module.define_module_function("decrypt", function!(present80::int_decrypt, 2))?;
    Ok(())
}
