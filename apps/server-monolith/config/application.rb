# frozen_string_literal: true

require_relative 'boot'

# See {https://github.com/rails/rails/blob/v6.1.3/railties/lib/rails/all.rb}
# Pick the frameworks you want:
require 'active_model/railtie'
require 'active_job/railtie'
require 'active_record/railtie'
require 'active_storage/engine'
require 'action_controller/railtie'
require 'action_mailer/railtie'
require 'action_view/railtie'
require 'action_cable/engine'
# require "rails/test_unit/railtie"

# eager load some dependencies
require_relative '../lib/brickdoc'
require_relative '../lib/brick_graphql'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)
Dotenv::Railtie.load

module Brickdoc
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 7.0

    config.action_mailer.deliver_later_queue_name = :default

    config.active_record.query_log_tags_enabled = true
    config.active_job.queue_adapter = :async
    config.logger = ::Logger.new($stdout)

    initializer :load_libs, after: :prepend_helpers_path, before: :load_config_initializers do
      require_relative '../app/models/application_record'
      require_relative '../app/models/brickdoc_config'
      Brickdoc::Plugins.load_all!

      ## Enabled Global Plugin defaults
      default_plugins = [
        '@brickdoc/github-auth',
        '@brickdoc/google-auth',
      ]
      default_plugins.each do |name|
        plugin = Brickdoc::Plugins.find(name)
        raise "Plugin #{name} not found, but it should be enabled by default" if plugin.nil?

        plugin.default_enabled!
      end
    end
  end
end
