# frozen_string_literal: true

module System
  module Queries
    class SpaceSearch < BrickGraphQL::BaseResolver
      description 'search spaces'
      type [System::Objects::Space], null: false
      authenticate_user!

      argument :input, GraphQL::Types::String, required: true

      def resolve(input:)
        return [] if input.blank?

        ::Space.where('LOWER(domain) = LOWER(?)', input)
      end
    end
  end
end
