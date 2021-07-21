# frozen_string_literal: true

module Docs
  class Queries::ChildrenBlocks < BrickGraphQL::BaseResolver
    type [Docs::Objects::Block], null: true

    argument :parent_id, GraphQL::Types::String, required: true,
             description: 'List all children from parent id'
    argument :exclude_pages, GraphQL::Types::Boolean, required: false

    argument :snapshot_version, GraphQL::Types::Int, required: true, description: 'Snapshot version'

    def resolve(parent_id:, exclude_pages: false, snapshot_version:)
      where = exclude_pages ? "docs_blocks.type != 'doc'" : nil
      if snapshot_version.zero?
        authorized_scope Docs::Block.where(where).find_by(id: parent_id).descendants_cache, as: :collaborating, with: Docs::BlockPolicy
      else
        # TODO: permission check
        Docs::Snapshot.find_by!(block_id: parent_id, snapshot_version: snapshot_version).blocks.map(&:cast_block)
      end
    end
  end
end
