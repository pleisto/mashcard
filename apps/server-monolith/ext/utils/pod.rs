use any_ascii::any_ascii;
use magnus::{function, module::RModule, Error, Module};
use rand::Rng;
use regex::Regex;
use uuid::Uuid;

/// Generate a username from a given display name
/// Returns a array of [preferred_username, alternative_username, unique_username]
/// When creating a new user could try in sequence until a first available username is found
fn to_username(display_name: String) -> Vec<String> {
    let re = Regex::new(r"^[a-z0-9]+(-[a-z0-9]+)*$").unwrap();
    let preferred = if re.is_match(&display_name) {
        display_name
    } else {
        any_ascii(&display_name)
            .replace(|ch: char| !ch.is_alphanumeric(), "")
            .to_lowercase()
    };
    let rand_int: u32 = rand::thread_rng().gen_range(0..999999999);
    let alternative = format!("{}-{}", preferred, radix_fmt::radix_36(rand_int));
    let uuid = radix_fmt::radix_36(Uuid::new_v4().to_u128_le()).to_string();
    vec![preferred, alternative, uuid]
}

pub fn init(parent: RModule) -> Result<(), Error> {
    let module = parent.define_module("Pod")?;
    module.define_module_function("to_username", function!(to_username, 1))?;
    Ok(())
}
