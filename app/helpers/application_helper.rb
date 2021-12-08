# frozen_string_literal: true
module ApplicationHelper
  def global_context
    {
      internalApiEndpoint: internal_graphql_api_path,
      currentUser: Current.user&.as_global_context,
      lastWebid: Brickdoc::Runtime.cypress? ? nil : Current.user&.last_webid,
      lastBlockIds: Brickdoc::Runtime.cypress? ? nil : Current.user&.last_block_ids,
      currentPod: Current.pod,
      env: Rails.env,
      locale: Brickdoc::I18n.locale,
      rtl: t('meta.dir') == 'rtl',
      timezone: Current.timezone,
      defaultTimezone: BrickdocConfig.default_timezone,
      host: Brickdoc::Runtime.host,
      csrfToken: form_authenticity_token,
      isDesktopApp: false,
      featureFlags: Flipper.features,
      settings: BrickdocConfig.to_frontend,
      serverMessage: flash[:alert],
      sentryDsn: BrickdocConfig.sentry_dsn
    }
  end

  def vite_stylesheet_bundle_tag
    vite_stylesheet_tag '~/style.css' unless ViteRuby.instance.dev_server_running?
  end
end
