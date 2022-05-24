use magnus::Error;
mod string;

pub fn init() -> Result<(), Error> {
    string::init()?;
    Ok(())
}
