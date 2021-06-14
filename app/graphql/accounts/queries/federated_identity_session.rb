# frozen_string_literal: true

module Accounts
  class Queries::FederatedIdentitySession < BrickGraphQL::BaseResolver
    requires_entrypoint_to_be :internal
    description 'provides a federated identity session data'
    type Accounts::Objects::OmniauthSession, null: false

    def resolve
      omniauth = context[:session][:omniauth]
      return { has_session: false } if omniauth.blank?
      {
        has_session: true,
        provider: omniauth['provider'],
        webid: omniauth['info']['webid'],
        name: omniauth['info']['name']
      }
    end
  end
end
