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
require_relative '../lib/mashcard'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)
Dotenv::Railtie.load

module Mashcard
  class Application < Rails::Application
    # Make sure global configuration is loaded early
    require_relative '../app/models/application_record'
    require_relative '../app/models/mashcard_config'

    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 7.0

    config.action_mailer.deliver_later_queue_name = :default

    # https://discuss.rubyonrails.org/t/cve-2022-32224-possible-rce-escalation-bug-with-serialized-columns-in-active-record/81017
    # Allow symbols to be used as keys of hash-type values for MashcardConfig
    config.active_record.yaml_column_permitted_classes = [Symbol]

    config.active_record.query_log_tags_enabled = true
    config.active_job.queue_adapter = :async
    config.logger = ::Logger.new($stdout)

    initializer :load_plugins, before: :load_config_initializers do
      Mashcard::Plugins.load_all!
      ## Enabled Global Plugin defaults
      default_plugins = [
        '@mashcard/github-auth',
        '@mashcard/google-auth',
      ]
      default_plugins.push '@pleisto/cloud' if ENV['MASHCARD_CLOUD_LICENSE'].present?
      default_plugins.push '@mashcard/mock-auth' if ENV['RAILS_ENV'].in?(['test', 'cicd'])
      default_plugins.each do |name|
        plugin = Mashcard::Plugins.find(name)
        raise "Plugin #{name} not found, but it should be enabled by default" if plugin.nil?

        plugin.default_enabled!
      end

      # Add extened edition plugin's initializer directory to load path if it is exist
      path = Mashcard::Plugins::ServerPlugin.extended_edition_path
      Dir["#{path}/config/initializers/*.rb"].sort.each { |file| load_config_initializer(file) } if path.present?
    end
  end
end
