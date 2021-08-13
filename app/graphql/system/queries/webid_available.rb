# frozen_string_literal: true

module System
  class Queries::WebidAvailable < BrickGraphQL::BaseResolver
    requires_entrypoint_to_be :internal
    description 'Check webid available.'
    type Objects::ValidateResult, null: false

    argument :webid, GraphQL::Types::String, required: true

    def resolve(webid:)
      Pod.webid_available? webid
    end
  end
end
