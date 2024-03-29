# frozen_string_literal: true

require 'active_support/core_ext/integer/time'

# The test environment is used exclusively to run your application's
# test suite. You never need to work with it otherwise. Remember that
# your test database is "scratch space" for the test suite and is wiped
# and recreated between test runs. Don't rely on the data there!

Rails.application.configure do
  # Settings specified here will take precedence over those in config/application.rb.

  # Turn false under Spring and add config.action_view.cache_template_loading = true
  config.cache_classes = false
  config.action_view.cache_template_loading = true

  # Do not eager load code on boot. This avoids loading your whole application
  # just for the purpose of running a single test. If you are using a tool that
  # preloads Rails for running tests, you may have to set it to true.
  config.eager_load = ENV['CI'].present?

  # Enable serving frontent assets from 'public'
  config.public_file_server.enabled = true

  # Configure public file server for tests with Cache-Control for performance.
  config.public_file_server.headers = {
    'Cache-Control' => "public, max-age=#{1.hour.to_i}",
  }

  # Show full error reports and disable caching.
  config.active_record.verbose_query_logs  = true
  config.consider_all_requests_local       = true
  config.action_controller.perform_caching = false
  # config.cache_store = :null_store

  # Raise exceptions instead of rendering exception templates.
  config.action_dispatch.show_exceptions = false

  # Disable request forgery protection in test environment.
  config.action_controller.allow_forgery_protection = false

  # Store uploaded files on the local file system in a temporary directory.
  # config.active_storage.service = :test

  config.action_mailer.perform_caching = false

  # Tell Action Mailer not to deliver emails to the real world.
  # The :test delivery method accumulates sent emails in the
  # ActionMailer::Base.deliveries array.
  config.action_mailer.delivery_method = :test

  # Print deprecation notices to the stderr.
  config.active_support.deprecation = :stderr

  # Raise exceptions for disallowed deprecations.
  config.active_support.disallowed_deprecation = :raise

  # Tell Active Support which deprecation messages to disallow.
  config.active_support.disallowed_deprecation_warnings = []

  # Raises error for missing translations.
  config.i18n.raise_on_missing_translations = true

  logger = ActiveSupport::Logger.new($stdout)
  logger.formatter = config.log_formatter
  config.logger    = ActiveSupport::TaggedLogging.new(logger)
  config.log_level = ENV['ENABLED_DEBUG_LOG'].present? ? :debug : :warn
  # Annotate rendered view with file names.
  # config.action_view.annotate_rendered_view_with_filenames = true

  # https://edgeguides.rubyonrails.org/configuring.html#config-action-controller-default-protect-from-forgery
  # Disable CSRF protection for development / test / cicd.
  config.action_controller.default_protect_from_forgery = false
end
