# frozen_string_literal: true

ENV['BUNDLE_GEMFILE'] ||= File.expand_path('../Gemfile', __dir__)

require 'bundler/setup' # Set up gems listed in the Gemfile.
require 'bootsnap/setup' # Speed up boot time by caching expensive operations.
require 'fast_underscore'
begin
  require_relative '../lib/brickdoc_ext'
rescue LoadError
  # rubocop:disable Rails/Output
  puts <<~MSG

    Error: Native extensions not found.
    Please run `yarn server build` to build the native extensions.

  MSG
  raise
end
