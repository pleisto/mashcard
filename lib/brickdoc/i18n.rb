# frozen_string_literal: true

module Brickdoc
  module I18n
    extend self
    AVAILABLE_LANGUAGES = {
      'en-US': 'English',
      'zh-CN': '简体中文'
      # 'zh-tw': '繁體中文 (台灣地區)',
      # 'zh-hk': '繁體中文 (港澳地區)'
    }

    # ignore this on I18Next
    SERVER_ONLY_SCOPES = [:activerecord, :doorkeeper, :devise, :datetime, :helpers, :number,
                          :date, :errors, :support, :time]

    def available_locales
      @available_locales ||= AVAILABLE_LANGUAGES.keys
    end

    def fallbacks
      {
        'zh-HK': :'zh-TW',
        'en-US': :en
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
      locale = AcceptLanguage.parse(value).match(*available_locales)
      return ::I18n.default_locale if locale.nil?
      locale
    end
  end
end
