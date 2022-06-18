# frozen_string_literal: true

module Types
  module Blocks
    class Alias < Types::BaseObject
      graphql_name 'BlockAlias'
      field :key, String, null: false
      field :payload, GraphQL::Types::JSON, null: false
    end
  end
end
