use magnus::{module::RModule, Error, Module};
//mod any_ascii;

pub fn init(parent: RModule) -> Result<(), Error> {
    let _module = parent.define_module("Encoding")?;
    //module.define_module_function("any_ascii", function!(any_ascii::for_rb_str, 1))?;
    Ok(())
}
