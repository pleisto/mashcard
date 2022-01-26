# frozen_string_literal: true

module Brickdoc
  module I18n
    extend self
    AVAILABLE_LANGUAGES = {
      'en-US': 'English',
      'zh-CN': '简体中文'
      # 'ja-JP': '日本語',
      # 'ar-SA': 'اَلْعَرَبِيَّةُ',
      # 'zh-HK': '繁體中文'
    }

    # ignore this on I18Next
    SERVER_ONLY_SCOPES = [:activerecord, :doorkeeper, :devise, :datetime, :helpers, :number,
                          :date, :errors, :support, :time]

    def available_locales
      @available_locales ||= AVAILABLE_LANGUAGES.keys
    end

    def fallbacks
      {
        'en-US': :en,
        'zh-CN': :'en-US'
        # 'zh-HK': :'zh-CN'
        # 'ja-JP': :'en-US',
        # 'ar-SA': :'en-US'
      }
    end

    def locale
      ::I18n.locale
    end

    def locale=(locale_str)
      ::I18n.locale = locale_str
    end

    def with_locale(locale_str, &action)
      locale = locale_str || ::I18n.default_locale
      ::I18n.with_locale(locale, &action)
    end

    def with_default_locale(&block)
      with_locale(::I18n.default_locale, &block)
    end

    def parse_accept_language(value)
      return ::I18n.default_locale if value.blank?
      locale = AcceptLanguage.parse(value).match(*available_locales)
      return ::I18n.default_locale if locale.nil?
      locale
    end
  end
end
