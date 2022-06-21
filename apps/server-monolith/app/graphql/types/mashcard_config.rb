# frozen_string_literal: true

module Types
  class MashcardConfig < Types::BaseObject
    graphql_name 'Config'
    description 'MashCard Global Configuration'

    field :accounts_email_password_auth, Boolean, 'Enable email and password authentication', null: false
    field :accounts_federated_providers, [Types::Users::FederatedProvider],
      'Enabled federated identity providers', null: true
    field :accounts_preferred_auth_method, Types::Users::AuthMethod,
      'Preferred Authentication authentication', null: false
    field :user_agreement_link, Scalars::HttpUrl, 'User agreement link', null: false

    def accounts_federated_providers
      Devise.omniauth_configs.map(&:last).map do |p|
        {
          name: p.provider,
          logo: p.options[:logo],
        }
      end
    end
  end
end
