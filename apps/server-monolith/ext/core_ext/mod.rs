use magnus::Error;
mod string;

/// It's the MashCard Server component responsible for providing Ruby language extensions.
pub fn init() -> Result<(), Error> {
    string::init()?;
    Ok(())
}
