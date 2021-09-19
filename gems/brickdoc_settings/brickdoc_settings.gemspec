# frozen_string_literal: true

require_relative "lib/brickdoc_settings/version"

Gem::Specification.new do |spec|
  spec.name          = "brickdoc_settings"
  spec.version       = BrickdocSettings::VERSION
  spec.version       = "0.0.1"
  spec.authors       = ["Brickdoc Inc."]
  spec.email         = ["engineering@brickdoc.com"]
  spec.summary       = "Brickdoc Settings"

  spec.required_ruby_version = Gem::Requirement.new(">= 2.4.0")

  # Specify which files should be added to the gem when it is released.
  # The `git ls-files -z` loads the files in the RubyGem that have been added into git.
  spec.files = [
    "Gemfile",
    "Gemfile.lock",
    "Rakefile",
    "brickdoc_settings.gemspec",
    "lib/brickdoc_settings.rb",
    "lib/brickdoc_settings/accessor.rb",
    "lib/brickdoc_settings/accessor_base.rb",
    "lib/brickdoc_settings/base.rb",
    "lib/brickdoc_settings/errors.rb",
    "lib/brickdoc_settings/version.rb",
  ]

  spec.require_paths = ["lib"]

  # Uncomment to register a new dependency of your gem
  spec.add_dependency "activesupport", ">= 6.1.0"

  # For more information and examples about making a new gem, checkout our
  # guide at: https://bundler.io/guides/creating_gem.html
end
