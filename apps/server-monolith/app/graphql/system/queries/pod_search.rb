# frozen_string_literal: true

module System
  module Queries
    class PodSearch < BrickGraphQL::BaseResolver
      description 'search pods'
      type [System::Objects::Pod], null: false
      authenticate_user!

      argument :input, GraphQL::Types::String, required: true

      def resolve(input:)
        return [] if input.blank?

        ::Pod.where('LOWER(domain) = LOWER(?)', input)
      end
    end
  end
end
