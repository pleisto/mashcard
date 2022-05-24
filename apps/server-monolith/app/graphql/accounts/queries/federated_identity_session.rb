# frozen_string_literal: true

module Accounts
  module Queries
    class FederatedIdentitySession < BrickGraphQL::BaseResolver
      requires_entrypoint_to_be :internal
      description 'provides a federated identity session data'
      type Accounts::Objects::OmniauthSession, null: false

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
end
