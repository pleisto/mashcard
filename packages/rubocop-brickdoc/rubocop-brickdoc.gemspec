# frozen_string_literal: true

Gem::Specification.new do |s|
  s.platform    = Gem::Platform::RUBY
  s.name        = 'rubocop-brickdoc'
  s.version     = '0.1.1'
  s.summary     = "Brickdoc LTD's style guide for Ruby."
  s.description = 'Gem containing the rubocop.yml config that corresponds to '\
    "the implementation of the Brickdoc LTD's style guide for Ruby."

  s.license = 'Apache-2.0'

  s.author   = 'Brickdoc LTD'
  s.email    = 'public@brickdoc.com'
  s.homepage = 'https://brickdoc.com/brickdoc/engineering/styleguide/ruby'

  s.files = %w[rubocop.yml rubocop-cli.yml]

  s.metadata = {
    'allowed_push_host' => 'https://rubygems.org'
  }

  s.add_dependency('rubocop', '>= 1.10')
end
