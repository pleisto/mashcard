# frozen_string_literal: true

Gem::Specification.new do |s|
  s.platform    = Gem::Platform::RUBY
  s.name        = "rubocop-brickdoc"
  s.version     = "1.0.0"
  s.summary     = "Brickdoc's style guide for Ruby."
  s.description = "Gem containing the rubocop.yml config that corresponds to "\
    "the implementation of the Brickdoc's style guide for Ruby."

  s.license = "Apache-2.0"

  s.author   = "Brickdoc Inc"
  s.email    = "oss@brickdoc.com"
  s.homepage = "https://github.com/brickdoc/brickdoc/"

  s.files = ["rubocop.yml"]

  s.metadata = {
    "source_code_uri" => "https://github.com/brickdoc/brickdoc/blob/main/gems/#{s.name}",
    "allowed_push_host" => "https://rubygems.org",
  }

  s.required_ruby_version = ">= 3.0.0"

  s.add_dependency("rubocop", ">= 1.29")
  s.add_dependency("rubocop-shopify", ">= 2.6")
  s.add_dependency("rubocop-rspec", ">= 2.11")
  s.add_dependency("rubocop-performance", ">= 1.13")
end
