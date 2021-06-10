# frozen_string_literal: true

module Accounts
  class Queries::AccountsWebidAvailable < BrickGraphQL::BaseResolver
    description 'Check webid available.'
    type GraphQL::Types::Boolean, null: false

    argument :webid, GraphQL::Types::String, required: true

    def resolve(webid:)
      Accounts::Pod.webid_available? webid
    end
  end
end
