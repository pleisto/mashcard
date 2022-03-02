# frozen_string_literal: true
module ApplicationHelper
  def global_context
    puts 'x'
    puts BrickdocConfig.to_frontend(scope: :features)
    {
      internalApiEndpoint: internal_graphql_api_path,
      currentUser: Current.user&.as_global_context,
      lastDomain: Brickdoc::Runtime.cypress? ? nil : Current.user&.last_space_domain,
      lastBlockIds: Brickdoc::Runtime.cypress? ? nil : Current.user&.last_block_ids,
      currentSpace: Current.space,
      env: Rails.env,
      locale: Brickdoc::I18n.locale,
      rtl: t('meta.dir') == 'rtl',
      timezone: Current.timezone,
      defaultTimezone: BrickdocConfig.default_timezone,
      host: Brickdoc::Runtime.host,
      csrfToken: form_authenticity_token,
      isDesktopApp: false,
      featureFlags: Flipper.features.map(&:name),
      settings: BrickdocConfig.to_frontend,
      features: BrickdocConfig.to_frontend(scope: :features),
      serverMessage: flash[:alert] == I18n.t('devise.failure.unauthenticated') ? nil : flash[:alert],
      sentryDsn: BrickdocConfig.sentry_dsn
    }
  end

  def vite_stylesheet_bundle_tag
    vite_stylesheet_tag '~/style.css' unless ViteRuby.instance.dev_server_running?
  end
end
