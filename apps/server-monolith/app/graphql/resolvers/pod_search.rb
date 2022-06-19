# frozen_string_literal: true

module Resolvers
  class PodSearch < BaseResolver
    description 'search pods'
    type [Types::Pod], null: false
    authenticate_user!

    argument :input, GraphQL::Types::String, required: true

    def resolve(input:)
      return [] if input.blank?

      ::Pod.where('LOWER(domain) = LOWER(?)', input)
    end
  end
end
