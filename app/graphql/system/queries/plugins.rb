# frozen_string_literal: true

module System
  class Queries::Plugins < BrickGraphQL::BaseResolver
    description 'return all plugins for pod.'
    type [System::Objects::Plugin], null: false
    authenticate_user!

    def resolve
      domain = current_pod.present? ? Pod.find(current_pod['id']) : :global
      BrickdocConfig.on(domain) do
        BrickdocPlugin.enabled_plugins.map(&:attributes)
      end
    end
  end
end
