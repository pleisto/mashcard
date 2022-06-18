# frozen_string_literal: true

module Resolvers
  class FederatedIdentitySession < BaseResolver
    description 'provides a federated identity session data'
    type Types::Users::OmniauthSession, null: false

    def resolve
      omniauth = context[:session][:omniauth]&.with_indifferent_access
      return { has_session: false } if omniauth.blank?

      {
        has_session: true,
        provider: omniauth[:provider],
        domain: omniauth[:info][:domain],
        name: omniauth[:info][:name],
      }
    end
  end
end
