# frozen_string_literal: true
require_relative "boot"

# See {https://github.com/rails/rails/blob/v6.1.3/railties/lib/rails/all.rb}
# Pick the frameworks you want:
require "active_model/railtie"
require "active_job/railtie"
require "active_record/railtie"
require "active_storage/engine"
require "action_controller/railtie"
require "action_mailer/railtie"
require "action_view/railtie"
require "action_cable/engine"
# require "rails/test_unit/railtie"

# eager load some dependencies
require_relative '../lib/brickdoc'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)
Dotenv::Railtie.load

module Brickdoc
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 7.0

    config.action_mailer.deliver_later_queue_name = :default

    config.autoload_paths << Rails.root.join('app', 'graphql')
    config.autoload_paths << Rails.root.join('app', 'services')

    config.active_record.query_log_tags_enabled = true

    # Run some initializers before Zeitwerk is loaded.
    # This empty initializer forces the :let_zeitwerk_take_over initializer to run before we load initializers
    # in `config/initializers`.
    initializer(:move_initializers, before: :load_config_initializers, after: :let_zeitwerk_take_over) {}
    initializer :before_zeitwerk, before: :let_zeitwerk_take_over, after: :prepend_helpers_path do
      Dir[Rails.root.join('config/before_initializers/*.rb')].sort.each { |file| load_config_initializer(file) }
    end

    config.before_initialize do
      ActiveSupport::Inflector.inflections do |inflect|
        inflect.acronym 'GraphQL'
        inflect.acronym 'UUID'
        inflect.acronym 'ID'
        inflect.acronym 'SaaS'
      end

      loader = Zeitwerk::Loader.new
      loader.inflector = Rails.autoloaders.main.inflector
      loader.push_dir Rails.root.join('lib')
      loader.setup
    end

    initializer :load_plugins, after: :prepend_helpers_path, before: :load_config_initializers do
      require_relative '../app/models/application_record'
      require_relative '../app/models/brickdoc_config'
      BrickdocPlugin.load_plugins

      ## Enabled Global Plugin
      default_global_plugins = %i(google_auth github_auth)
      BrickdocConfig.on(:global) do
        default_global_plugins.each { |name| BrickdocPlugin.plugin(name).default_enabled! }
      end

      Devise.setup do |config|
        BrickdocHook.trigger :omniauth_providers_setup, config
      end
    end
  end
end
