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

  Rails.application.default_url_options = {
    host: BrickdocConfig.host,
    port: Rails.env.development? ? 3000 : nil
  }

  ## ActiveStorage
  Rails.application.config.active_storage.service = BrickdocConfig.active_storage_service.to_sym
  Rails.application.config.active_storage.analyzers.delete ActiveStorage::Analyzer::VideoAnalyzer
  Rails.application.config.active_storage.analyzers.delete ActiveStorage::Analyzer::ImageAnalyzer
  Rails.application.config.active_storage.draw_routes = false
  ActiveStorage.draw_routes = false

  ActiveSupport.on_load(:active_storage_blob) do
    ActiveStorage::Attachment.send(:second_level_cache, expires_in: 1.week)
    ActiveStorage::Blob.send(:second_level_cache, expires_in: 1.week)
  end

  # Mailer
  smtp_settings = URI(BrickdocConfig.mailer[:url])
  Rails.application.configure do
    config.action_mailer.default_url_options = Rails.application.default_url_options
    config.action_mailer.delivery_method = Rails.env.test? ? :test : :smtp
    config.action_mailer.default_options = {
      from: BrickdocConfig.mailer[:from]
    }
    config.action_mailer.smtp_settings = {
      address: smtp_settings.hostname,
      port: smtp_settings.port,
      user_name: smtp_settings.user,
      password: smtp_settings.password,
      enable_starttls_auto: true
    }
    config.active_storage.default_url_options = Rails.application.default_url_options
    if Rails.env.development?
      ## TODO remove this when this commit is released https://github.com/rails/rails/commit/e9accafc844ed5981ce7f50afe8261d5ef07d4d2
      ActiveStorage::Current.host = "http://#{Rails.application.default_url_options.fetch(:host)}:#{Rails.application.default_url_options.fetch(:port)}"
    end
  end
end
