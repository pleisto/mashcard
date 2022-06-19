# frozen_string_literal: true

module Types
  module Users
    class FederatedProvider < Types::BaseObject
      graphql_name 'FederatedProvider'
      description 'Accounts Federated Identity Provide Configuration'

      field :logo, Scalars::HttpUrl, 'Provider Logo URI', null: false
      field :name, String, 'Provider Name', null: false
    end
  end
end
