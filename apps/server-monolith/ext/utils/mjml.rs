use magnus::{exception, function, method, module::RModule, Error, Module, Object};
use mrml::{mjml::MJML, parse, prelude::render::Options};

/// MJML is a markup language designed to reduce the pain of coding a responsive email.
/// mrml is a Rust implementation of MJML.
/// See: https://github.com/jdrouet/mrml
#[magnus::wrap(class = "Mashcard::Utils::MJML")]
struct RubyMJML {
    mjml: MJML,
}

impl RubyMJML {
    fn new(template: String) -> Result<RubyMJML, Error> {
        parse(&template)
            .map_err(|e| {
                Error::new(
                    exception::arg_error(),
                    format!("Invalid MJML \n {}", e.to_string()),
                )
            })
            .map(|mjml| Self { mjml })
    }

    /// Get title for MJML
    fn title(&self) -> String {
        self.mjml.get_title().unwrap_or_else(|| "".to_string())
    }

    /// Get preview for MJML
    fn preview(&self) -> String {
        self.mjml.get_preview().unwrap_or_else(|| "".to_string())
    }

    /// Get HTML for MJML
    fn to_html(&self) -> String {
        let opts = Options::default();
        self.mjml.render(&opts).unwrap_or_else(|_| "".to_string())
    }
}

pub fn init(parent: RModule) -> Result<(), Error> {
    let class = parent.define_class("MJML", Default::default())?;
    class.define_singleton_method("new", function!(RubyMJML::new, 1))?;
    class.define_method("title", method!(RubyMJML::title, 0))?;
    class.define_method("preview", method!(RubyMJML::preview, 0))?;
    class.define_method("to_html", method!(RubyMJML::to_html, 0))?;
    Ok(())
}
