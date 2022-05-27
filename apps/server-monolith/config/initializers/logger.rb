# frozen_string_literal: true

# We care about your privacy.
# So keep PII out of logs.
Logstop.guard(Rails.logger)
Rails.application.configure do
  return if Rails.env.development?

  config.lograge.enabled = true
  config.logger = Brickdoc::Logger::RailsLogger.new($stdout)
  config.colorize_logging = false
  config.lograge.base_controller_class = ['ActionController::API', 'ActionController::Base']
  config.lograge.keep_original_rails_log = false
  config.lograge.formatter = Brickdoc::Logger::LogrageJsonFormatter
  # Add request parameters to log output
  config.lograge.custom_options = Brickdoc::Logger::LogrageCustomOptions
end
