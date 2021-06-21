# frozen_string_literal: true

module Docs
  class Queries::Block < BrickGraphQL::BaseResolver
    description 'return single block by id.'
    type Docs::Objects::Block, null: true
    authenticate_user!

    argument :id, GraphQL::Types::String, required: true

    def resolve(id:)
      Docs::Block.find id
    end
  end
end
