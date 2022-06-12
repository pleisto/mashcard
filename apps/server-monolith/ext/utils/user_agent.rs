use magnus::{exception, function, module::RModule, Error, Module};
use std::collections::HashMap;
use woothee::parser::Parser;

fn parse(ua: String) -> Result<HashMap<String, String>, Error> {
    let parser = Parser::new();
    match parser.parse(&ua) {
        None => Err(Error::new(
            exception::arg_error(),
            format!("Invalid user agent: {}", ua),
        )),
        Some(r) => {
            let mut h = HashMap::new();
            h.insert("name".to_string(), r.name.to_string());
            h.insert("category".to_string(), r.category.to_string());
            h.insert("os".to_string(), r.os.to_string());
            h.insert("os_version".to_string(), r.os_version.to_string());
            h.insert("browser_type".to_string(), r.browser_type.to_string());
            h.insert("version".to_string(), r.version.to_string());
            h.insert("vendor".to_string(), r.vendor.to_string());
            Ok(h)
        }
    }
}

pub fn init(parent: RModule) -> Result<(), Error> {
    let module = parent.define_module("UserAgent")?;
    module.define_module_function("parse", function!(parse, 1))?;
    Ok(())
}
