# typed: false
# frozen_string_literal: true

if !Rails.env.development? && !Rails.env.test?
  Sentry.init do |config|
    config.dsn = BrickdocConfig.sentry_dsn
    config.breadcrumbs_logger = [:active_support_logger, :http_logger]

    # Set tracesSampleRate to 1.0 to capture 100%
    # of transactions for performance monitoring.
    # We recommend adjusting this value in production
    config.traces_sample_rate = 0.5
    # or
    # config.traces_sampler = lambda do |context|
    #   true
    # end
  end
end
