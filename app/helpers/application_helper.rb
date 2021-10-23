# frozen_string_literal: true
module ApplicationHelper
  def cypree_running?
    ENV['CYPRESS'] == '1'
  end

  def global_context
    {
      internalApiEndpoint: internal_graphql_api_path,
      currentUser: Current.user&.as_global_context,
      lastWebid: cypree_running? ? nil : Current.user&.last_webid,
      lastBlockIds: cypree_running? ? nil : Current.user&.last_block_ids,
      currentPod: Current.pod,
      env: Rails.env,
      version: Brickdoc.full_version,
      locale: Brickdoc::I18n.locale,
      rtl: t('meta.dir') == 'rtl',
      timezone: Current.timezone,
      defaultTimezone: BrickdocConfig.default_timezone,
      host: Brickdoc::Runtime.host,
      selfHosted: Brickdoc.self_hosted?,
      csrfToken: form_authenticity_token,
      isDesktopApp: false,
      featureFlags: Flipper.features,
      settings: BrickdocConfig.to_frontend,
      serverMessage: flash[:alert],
      sentryDsn: BrickdocConfig.sentry_dsn
    }
  end
end
