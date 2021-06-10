# frozen_string_literal: true

# Don't use json formatter on local development env.
unless Rails.env.test? || Rails.env.development?
  Rails.logger = Brickdoc::Logger.new(STDOUT)
  Rails.application.configure do
    config.colorize_logging = false
    config.lograge.enabled = true
    config.lograge.keep_original_rails_log = false
    config.lograge.base_controller_class = %w[ActionController::API]
    config.lograge.formatter = Lograge::Formatters::Raw.new
    config.lograge.custom_options = lambda do |event|
      {
        event: 'http.request',
        exception: event.payload[:exception], # ["ExceptionClass", "the message"]
        exception_object: event.payload[:exception_object], # the exception instance
        request_id: event.payload[:request_id],
        current_user_id: event.payload[:current_user]&.id
      }
    end
  end

  # SaaS GDPR
  Logstop.guard(Rails.logger) if Rails.env.production? && BrickdocConfig.pii_masking?

  ActiveRecord::Base.logger = Rails.logger
end
