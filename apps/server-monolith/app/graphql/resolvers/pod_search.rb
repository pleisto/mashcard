# frozen_string_literal: true

module Resolvers
  class PodSearch < BaseResolver
    description 'search pods'
    type [Types::BasePod], null: false
    authenticate_user!

    argument :input, GraphQL::Types::String, required: true

    def resolve(input:)
      return [] if input.blank?

      ::Pod.where('LOWER(username) = LOWER(?)', input)
    end
  end
end
