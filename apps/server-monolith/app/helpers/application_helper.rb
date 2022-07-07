# frozen_string_literal: true

module ApplicationHelper
  def global_context
    {
      version: Mashcard::Runtime.version,
      monorepoVersion: Mashcard::Runtime.monorepo_version,
      internalApiEndpoint: internal_graphql_api_path,
      currentUser: Current.user&.as_global_context,
      lastDomain: Mashcard::Runtime.cypress? ? nil : Current.user&.last_pod_username,
      lastBlockIds: Mashcard::Runtime.cypress? ? nil : Current.user&.last_block_ids,
      currentPod: Current.pod,
      env: Rails.env,
      locale: Mashcard::I18n.locale,
      rtl: t('meta.dir') == 'rtl',
      timezone: Current.timezone,
      defaultTimezone: MashcardConfig.default_timezone,
      csrfToken: form_authenticity_token,
      isDesktopApp: false,
      featureFlags: Flipper.features.map(&:name),
      settings: MashcardConfig.to_frontend,
      features: MashcardConfig.to_frontend(namespace: :features),
      serverMessage: flash[:alert] == I18n.t('devise.failure.unauthenticated') ? nil : flash[:alert],
      sentryDsn: ENV['SENTRY_DSN'],
    }
  end

  # Loads js-bundle plugins entrypoint js file.
  def vite_plugin_bundle_tags
    entrypoints = Mashcard::Plugins::JsBundlePlugin.enabled_entrypoints
    return if entrypoints.blank?

    entrypoints.map do |entrypoint|
      concat javascript_include_tag Mashcard::Plugins::Vite.get_path(entrypoint), extname: false
    end
  end

  # Get asset url for /apps/server-monolith/app/frontend/assets folder.
  def vite_frontend_asset_path(path)
    full_path = Mashcard::Plugins::Vite.get_path(Rails.root.join('app/frontend/assets', path)) || path
    url_to_asset full_path
  end

  # Get entrypoint typescript tag for /apps/server-monolith/app/frontend/entrypoints folder.
  def vite_frontend_entrypoint_tag(entrypoint, **options)
    options = { extname: false, crossorigin: :anonymous, type: :module }.merge(options)
    javascript_include_tag Mashcard::Plugins::Vite.get_path(
      Rails.root.join('app/frontend/entrypoints', entrypoint)
    ), **options
  end

  # Render a partial when it is exist. The main purpose of this method is to
  # as a hooks for a plugin that declares themselves as an extended edition.
  # @param [String] path_to_partial path to partial
  def render_if_exists(path_to_partial)
    path = path_to_partial.is_a?(Hash) ? path_to_partial[:partial] : path_to_partial
    render path_to_partial if lookup_context.find_all(path, [], true).any?
  end
end
