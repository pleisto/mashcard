# frozen_string_literal: true

module ApplicationHelper
  def global_context
    {
      version: Mashcard::Runtime.version,
      monorepoVersion: Mashcard::Runtime.monorepo_version,
      internalApiEndpoint: {
        graphql: internal_graphql_api_path,
        actionCable: ActionCable.server.config.url || ActionCable.server.config.mount_path,
      },
      currentUser: Current.user&.as_global_context,
      lastDomain: Mashcard::Runtime.cypress? ? nil : Current.user&.last_pod_username,
      lastBlockIds: Mashcard::Runtime.cypress? ? nil : Current.user&.last_block_ids,
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

  # Render a partial when it is exist. The main purpose of this method is to
  # as a hooks for a plugin that declares themselves as an extended edition.
  # @param [String] path_to_partial path to partial
  def render_if_exists(path_to_partial)
    path = path_to_partial.is_a?(Hash) ? path_to_partial[:partial] : path_to_partial
    render path_to_partial if lookup_context.find_all(path, [], true).any?
  end
end
