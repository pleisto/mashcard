# frozen_string_literal: true

Rails.application.reloader.to_prepare do
  # I18n
  require 'i18n/backend/fallbacks'
  I18n::Backend::Simple.send(:include, I18n::Backend::Fallbacks)
  I18n.available_locales = Brickdoc::I18n.available_locales
  I18n.default_locale = BrickdocConfig.default_locale
  ## Fallbacks
  I18n.fallbacks.map(Brickdoc::I18n.fallbacks)

  # Nokogiri is significantly faster and use less memory than REXML
  ActiveSupport::XmlMini.backend = 'Nokogiri'

  # Ensure Oj runs in json-gem compatibility mode by default
  Oj.default_options = { mode: :rails }
  Oj::Rails.set_encoder
  Oj::Rails.set_decoder
  Oj::Rails.optimize(Array, BigDecimal, Hash, Range, Regexp, Time)

  # Http client
  Faraday.default_adapter = :typhoeus

  # Cache
  Rails.application.config.cache_store = [:redis_cache_store, {
    redis: Brickdoc::Redis.pool(:cache),
    compress: 1,
    expires_in: 20.days
  }]

  # @see https://github.com/jhawthorn/actionview_precompiler
  ActionviewPrecompiler.precompile unless Rails.env.development?

  # Mailer
  smtp_settings = URI(BrickdocConfig.mailer[:url])
  Rails.application.configure do
    unless Rails.env.test?
      config.action_mailer.delivery_method = :smtp
      config.action_mailer.default_options = {
        from: BrickdocConfig.mailer[:from]
      }
      config.action_mailer.smtp_settings = {
        addresses: smtp_settings.hostname,
        port: smtp_settings.port,
        user_name: smtp_settings.user,
        password: smtp_settings.password
      }
    end
  end
end
