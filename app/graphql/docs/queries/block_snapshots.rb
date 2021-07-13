# frozen_string_literal: true

module Docs
  class Queries::BlockSnapshots < BrickGraphQL::BaseResolver
    description 'return snapshots by block id.'
    type [Docs::Objects::BlockSnapshot], null: true
    authenticate_user!

    argument :id, GraphQL::Types::String, required: true

    def resolve(id:)
      Docs::Block.find(id).snapshots
    end
  end
end
