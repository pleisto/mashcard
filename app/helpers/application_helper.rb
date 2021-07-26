# frozen_string_literal: true
module ApplicationHelper
  def global_context
    {
      internalApiEndpoint: internal_graphql_api_path,
      currentUser: Current.user&.as_global_context,
      currentPod: Current.pod,
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

  def pwa_entrypoint(name)
    content_for :stylesheet_head do
      stylesheet_pack_tag name
    end
    capture do
      concat render partial: 'layouts/browser_checker'
      concat tag :div, role: 'application', id: "#{name}-pwa__entrypoint", style: 'width:100%;min-height:100%;'
      concat javascript_pack_tag 'application', name
    end
  end
end
