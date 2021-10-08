# frozen_string_literal: true

module System
  class Queries::PodSearch < BrickGraphQL::BaseResolver
    description 'search pods'
    type [System::Objects::Pod], null: false
    authenticate_user!

    argument :input, GraphQL::Types::String, required: true

    def resolve(input:)
      return [] if input.blank?
      Pod.where("LOWER(webid) = LOWER(?)", input)
    end
  end
end
