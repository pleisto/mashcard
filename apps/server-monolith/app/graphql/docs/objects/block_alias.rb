# frozen_string_literal: true

module Docs
  module Objects
    class BlockAlias < BrickGraphQL::BaseObject
      field :key, String, null: false
      field :payload, GraphQL::Types::JSON, null: false
    end
  end
end
