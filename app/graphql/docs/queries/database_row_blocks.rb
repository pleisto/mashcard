# frozen_string_literal: true

module Docs
  class Queries::DatabaseRowBlocks < BrickGraphQL::BaseResolver
    type [Docs::Objects::Block], null: true

    argument :parent_id, GraphQL::Types::String, required: true,
             description: 'List all children from parent id'

    argument :snapshot_version, GraphQL::Types::Int, required: true, description: 'Snapshot version'

    def resolve(parent_id:, snapshot_version:)
      if snapshot_version.zero?
        Docs::Block.where(parent_id: parent_id, type: 'databaseRow').non_deleted.order('sort ASC').to_a
      else
        # TODO: filter blocks type only database_row
        Docs::Snapshot.find_by!(block_id: parent_id, snapshot_version: snapshot_version).blocks.graphql_normalize
      end
    end
  end
end
