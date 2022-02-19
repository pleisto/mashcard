# frozen_string_literal: true

module System
  class Queries::DomainAvailable < BrickGraphQL::BaseResolver
    requires_entrypoint_to_be :internal
    description 'Check domain available.'
    type Objects::ValidateResult, null: false

    argument :domain, GraphQL::Types::String, required: true

    def resolve(domain:)
      Space.domain_available? domain
    end
  end
end
