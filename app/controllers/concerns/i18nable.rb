# frozen_string_literal: true

module I18nable
  extend ActiveSupport::Concern

  def switch_locale(&action)
    locale = detect_accept_language
    Brickdoc::I18n.with_locale(locale, &action)
  end

  def detect_accept_language
    return cookies[:default_locale] if cookies[:default_locale].present?
    return false unless request.headers.key?('HTTP_ACCEPT_LANGUAGE')
    Brickdoc::I18n.parse_accept_language request.headers.fetch('HTTP_ACCEPT_LANGUAGE')
  end
end
