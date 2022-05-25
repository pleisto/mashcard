use magnus::{exception, function, module::RModule, Error, Module};
use uuid::Uuid;

/// Generate a UUID v4
fn gen_v4() -> String {
    Uuid::new_v4().to_string()
}

/// Generate a shorted UUID
fn gen_short() -> String {
    v4_to_short_internal(Uuid::new_v4())
}

/// Convert a UUID to a short UUID
fn shorten(uuid_v4: String) -> Result<String, Error> {
      Uuid::parse_str(&uuid_v4)
      .map_err(|e| Error::new(exception::arg_error(), e.to_string()))
      .map(v4_to_short_internal)
}

fn expand(short_uuid: String) -> Result<String, Error> {
    let mut uuid_buf = [0u8; 16];
    bs58::decode(short_uuid)
    .into(&mut uuid_buf)
    .map_err(|e| Error::new(exception::arg_error(), e.to_string()))
    .map(|_| Uuid::from_bytes(uuid_buf).as_hyphenated().to_string())
}

/// Internal function to convert a UUID to a shorted UUID
fn v4_to_short_internal(uuid: Uuid) -> String {
  bs58::encode(uuid.as_simple().as_ref()).into_string()
}

pub fn init(parent: RModule) -> Result<(), Error> {
    let module = parent.define_module("UUID")?;
    module.define_module_function("gen_v4", function!(gen_v4, 0))?;
    module.define_module_function("gen_short", function!(gen_short, 0))?;
    module.define_module_function("shorten", function!(shorten, 1))?;
    module.define_module_function("expand", function!(expand, 1))?;
    Ok(())
}
