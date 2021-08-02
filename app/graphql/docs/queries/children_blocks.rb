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
        root = Docs::Block.where(where).find_by(id: parent_id)
        if root.nil?
          params = {
            id: parent_id,
            type: 'doc',
            data: { text: "", content: [] },
            pod_id: current_pod.fetch('id'),
            collaborators: [current_user.id]
          }
          root = Docs::Block.create!(params)
        end

        ## TODO check permission

        blocks = root.descendants_cache
        ## NOTE cast to `doc`
        blocks = blocks.map do |b|
          if b.id == parent_id
            b.type = 'doc'
            b.parent_id = nil
          end
          b
        end

        authorized_scope blocks, as: :collaborating, with: Docs::BlockPolicy
      else
        # TODO: permission check
        Docs::Snapshot.find_by!(block_id: parent_id, snapshot_version: snapshot_version).blocks.map(&:cast_block)
      end
    end
  end
end
