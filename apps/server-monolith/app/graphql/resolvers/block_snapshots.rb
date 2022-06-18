# frozen_string_literal: true

module Resolvers
  class BlockSnapshots < BaseResolver
    description 'return snapshots by block id.'
    type [Types::Blocks::Snapshot], null: true
    authenticate_user!

    argument :id, GraphQL::Types::String, required: true

    def resolve(id:)
      Docs::Block.find(id).snapshots.order(snapshot_version: :desc)
    end
  end
end
