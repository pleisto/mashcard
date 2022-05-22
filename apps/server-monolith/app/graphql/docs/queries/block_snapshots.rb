# typed: true
# frozen_string_literal: true

module Docs
  module Queries
    class BlockSnapshots < BrickGraphQL::BaseResolver
      description 'return snapshots by block id.'
      type [Docs::Objects::BlockSnapshot], null: true
      authenticate_user!

      argument :id, GraphQL::Types::String, required: true

      def resolve(id:)
        Docs::Block.find(id).snapshots.order(snapshot_version: :desc)
      end
    end
  end
end
