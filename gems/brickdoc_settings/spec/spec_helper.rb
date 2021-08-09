# frozen_string_literal: true
require 'simplecov'
SimpleCov.start

require 'rspec/active_model/mocks'
require 'securerandom'

require 'brickdoc_settings'

RSpec.configure do |config|
  # Enable flags like --only-failures and --next-failure
  # config.example_status_persistence_file_path = ".rspec_status"

  # Disable RSpec exposing methods globally on `Module` and `main`
  config.disable_monkey_patching!

  config.expect_with :rspec do |c|
    c.syntax = :expect
  end

  config.expose_dsl_globally = true
end
