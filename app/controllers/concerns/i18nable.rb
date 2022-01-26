# frozen_string_literal: true

module I18nable
  extend ActiveSupport::Concern

  def switch_locale(&action)
    locale = detect_accept_language
    Brickdoc::I18n.with_locale(locale, &action)
  end

  def detect_accept_language
    return Current.user.locale if Current.user.present?
    return cookies[:default_locale] if cookies[:default_locale].present?
    # Brickdoc::I18n.parse_accept_language request.headers.fetch('HTTP_ACCEPT_LANGUAGE', nil)
    I18n.default_locale
  end
end
