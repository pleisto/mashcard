# frozen_string_literal: true
$LOAD_PATH.push File.expand_path("../lib", __FILE__)
require "webpacker/version"

Gem::Specification.new do |s|
  s.name     = "webpacker"
  s.version  = Webpacker::VERSION
  s.authors  = ["David Heinemeier Hansson", "Gaurav Tiwari", "Brickdoc LTD"]
  s.email    = ["david@basecamp.com", "gaurav@gauravtiwari.co.uk"]
  s.summary  = "Use webpack to manage app-like JavaScript modules in Rails"
  s.homepage = "https://github.com/brickdoc/brickdoc"
  s.license  = "MIT"

  s.metadata = {
    "source_code_uri" => "https://github.com/brickdoc/brickdoc/tree/master/packages/webpack"
  }

  s.required_ruby_version = ">= 3.0.0"

  s.add_dependency "activesupport", ">= 6.1"
  s.add_dependency "railties",      ">= 6.1"
  s.add_dependency "rack-proxy",    ">= 0.7.0"
  s.add_dependency "semantic_range", ">= 2.3.0"
end
