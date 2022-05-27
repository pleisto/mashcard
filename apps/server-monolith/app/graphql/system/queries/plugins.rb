# frozen_string_literal: true

module System
  module Queries
    class Plugins < BrickGraphQL::BaseResolver
      description 'return all plugins for space.'
      type [System::Objects::Plugin], null: false
      authenticate_user!

      def resolve
        BrickdocPlugin.enabled_plugins.map(&:attributes)
      end
    end
  end
end
