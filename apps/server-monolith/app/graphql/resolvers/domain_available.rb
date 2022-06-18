# frozen_string_literal: true

module Resolvers
  class DomainAvailable < BaseResolver
    description 'Check domain available.'
    type Types::ValidateResult, null: false

    argument :domain, GraphQL::Types::String, required: true

    def resolve(domain:)
      ::Pod.domain_available? domain
    end
  end
end
