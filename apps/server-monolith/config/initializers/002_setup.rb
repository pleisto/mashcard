# frozen_string_literal: true

Rails.application.reloader.to_prepare do
  # I18n
  require 'i18n/backend/fallbacks'
  I18n::Backend::Simple.send(:include, I18n::Backend::Fallbacks)
  I18n.available_locales = Mashcard::I18n.available_locales
  I18n.default_locale = MashcardConfig.locale
  ## Fallbacks
  I18n.fallbacks.map(Mashcard::I18n.fallbacks)

  # Nokogiri is significantly faster and use less memory than REXML
  ActiveSupport::XmlMini.backend = 'Nokogiri'

  # Ensure Oj runs in json-gem compatibility mode by default
  Oj.default_options = { mode: :rails }
  Oj::Rails.set_encoder
  Oj::Rails.set_decoder
  Oj::Rails.optimize(Array, BigDecimal, Hash, Range, Regexp, Time)

  # Cache
  Rails.application.config.cache_store = [:redis_cache_store, {
    redis: Mashcard::Redis.pool(:cache),
    compress: 1,
    expires_in: 20.days,
  },]

  Rails.application.default_url_options = {
    host: MashcardConfig.host,
    port: Rails.env.development? ? 3036 : nil,
  }

  ## ActiveStorage
  Rails.application.config.active_storage.service = MashcardConfig.active_storage_service.to_sym
  Rails.application.config.active_storage.draw_routes = false
  ActiveStorage.draw_routes = false

  ActiveSupport.on_load(:active_storage_blob) do
    ActiveStorage::Attachment.send(:second_level_cache, expires_in: 1.week)
    ActiveStorage::Blob.send(:second_level_cache, expires_in: 1.week)
  end

  # Mailer
  smtp_settings = URI(MashcardConfig.mailer[:url])
  Rails.application.configure do
    config.action_mailer.default_url_options = Rails.application.default_url_options
    config.action_mailer.delivery_method = Rails.env.production? ? :smtp : :test
    config.action_mailer.default_options = {
      from: MashcardConfig.mailer[:from],
    }
    config.action_mailer.smtp_settings = {
      address: smtp_settings.hostname,
      port: smtp_settings.port,
      tls: smtp_settings.scheme == 'smtps',
      user_name: URI.decode_www_form_component(smtp_settings.user.to_s),
      password: smtp_settings.password,
      enable_starttls_auto: true,
    }
    Devise::Async.enabled = false unless Rails.env.production?
    config.active_storage.default_url_options = Rails.application.default_url_options
    ActiveStorage::Current.url_options = Rails.application.default_url_options
    config.action_mailer.preview_path = Rails.root.join('spec/mailer_previews')
  end
end
