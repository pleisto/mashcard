# frozen_string_literal: true

module ApplicationHelper
  def global_context
    {
      version: Brickdoc::Runtime.version,
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
      features: BrickdocConfig.to_frontend(namespace: :features),
      serverMessage: flash[:alert] == I18n.t('devise.failure.unauthenticated') ? nil : flash[:alert],
      sentryDsn: ENV['SENTRY_DSN'],
    }
  end

  # Loads js-bundle plugins entrypoint js file.
  def vite_plugin_bundle_tags
    entrypoints = Brickdoc::Plugins::JsBundlePlugin.enabled_entrypoints
    return if entrypoints.blank?

    entrypoints.map do |entrypoint|
      concat javascript_include_tag Brickdoc::Plugins::Vite.get_path(entrypoint), extname: false
    end
  end

  # Render a partial when it is exist. The main purpose of this method is to
  # as a hooks for a plugin that declares themselves as an extended edition.
  # @param [String] path_to_partial path to partial
  def render_if_exists(path_to_partial)
    path = path_to_partial.is_a?(Hash) ? path_to_partial[:partial] : path_to_partial
    render path_to_partial if lookup_context.find_all(path, [], true).any?
  end
end
