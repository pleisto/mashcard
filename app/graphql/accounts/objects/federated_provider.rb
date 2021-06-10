# frozen_string_literal: true
module Accounts
  module Objects
    class FederatedProvider < BrickGraphQL::BaseObject
      graphql_name 'federatedProvider'
      description 'Accounts Federated Identity Provide Configuration'

      field :name, String, 'Provider Name', null: false
      field :logo, BrickGraphQL::Scalars::HttpUrl, 'Provider Logo URI', null: false
    end
  end
end
