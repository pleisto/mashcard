# frozen_string_literal: true

module System
  class Queries::Plugins < BrickGraphQL::BaseResolver
    description 'return all plugins for user.'
    type [System::Objects::Plugin], null: false
    authenticate_user!

    def resolve
      BrickdocConfig.current = BrickdocConfig.at(current_pod.fetch('webid'))
      BrickdocPlugin.enabled_plugins.map(&:attributes)
    end
  end
end
