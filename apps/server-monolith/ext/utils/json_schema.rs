use crate::utils::ffi::str_to_json_value;
use jsonschema::{Draft, JSONSchema};
use magnus::{exception, function, method, module::RModule, Error, Module, Object};

#[magnus::wrap(class = "Brickdoc::Utils::JSONSchema")]
struct RubyJSONSchema {
    schema: JSONSchema,
}

impl RubyJSONSchema {
    fn new(schema_str: String) -> Result<RubyJSONSchema, Error> {
        JSONSchema::options()
            .with_draft(Draft::Draft7)
            .compile(&str_to_json_value(&schema_str, "JSONSchema")?)
            .map_err(|e| {
                Error::new(
                    exception::arg_error(),
                    format!("Invalid JsonSchema \n {}", e),
                )
            })
            .map(|schema| Self { schema })
    }

    /// Validates a JSON string against a JSON schema.
    /// Throw an exception if the JSON string is invalid.
    fn validate(&self, json: String) -> Result<(), Error> {
        self.schema
            .validate(&str_to_json_value(&json, "json")?)
            .map_err(|errors| {
                Error::new(
                    exception::arg_error(),
                    errors
                        .map(|e| {
                            format!(
                                "Validation error: {}, Instance path: {}",
                                e, e.instance_path
                            )
                        })
                        .collect::<Vec<_>>()
                        .join("\n"),
                )
            })
    }

    /// Check if a JSON string is valid against a JSON schema.
    /// Returns true if the JSON string is valid, false otherwise.
    fn valid(&self, json: String) -> bool {
        self.validate(json).is_ok()
    }
}

pub fn init(parent: RModule) -> Result<(), Error> {
    let class = parent.define_class("JSONSchema", Default::default())?;
    class.define_singleton_method("new", function!(RubyJSONSchema::new, 1))?;
    class.define_method("validate!", method!(RubyJSONSchema::validate, 1))?;
    class.define_method("valid?", method!(RubyJSONSchema::valid, 1))?;
    Ok(())
}
