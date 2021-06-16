# frozen_string_literal: true
module ApplicationHelper
  def global_context
    {
      internalApiEndpoint: internal_graphql_api_path,
      currentUser: Current.user.as_json(only: [:webid, :name]),
      env: Rails.env,
      version: Brickdoc.full_version,
      locale: Brickdoc::I18n.locale,
      rtl: t('meta.dir') == 'rtl',
      timezone: Current.timezone,
      defaultTimezone: BrickdocConfig.default_timezone,
      selfHosted: Brickdoc.self_hosted?,
      csrfToken: form_authenticity_token,
      isDesktopApp: false,
      featureFlags: Flipper.features,
      serverMessage: flash[:alert]
    }
  end
end
