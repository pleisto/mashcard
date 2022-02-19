# frozen_string_literal: true

module Docs
  class Queries::ChildrenBlocks < BrickGraphQL::BaseResolver
    type [Docs::Objects::Block], null: true

    argument :root_id, GraphQL::Types::String, required: true,
             description: 'List all children from root id'

    argument :snapshot_version, GraphQL::Types::Int, required: true, description: 'Snapshot version'

    def resolve(root_id:, snapshot_version:)
      return [] if root_id.blank?
      if snapshot_version.zero?
        root = Docs::Block.unscoped.find_by(id: root_id)
        raise BrickGraphQL::Errors::ArgumentError, :already_hard_deleted if root&.deleted_permanently_at

        if root.nil?
          params = {
            id: root_id,
            page: true,
            type: 'doc',
            data: {},
            text: '',
            content: [],
            space_id: current_space.fetch('id'),
            collaborators: [current_user.id]
          }
          root = Docs::Block.create!(params)
        end

        # TODO: storageType?
        blocks = root.descendants.where('type NOT IN (?)', ['databaseRow', 'spreadsheetRow', 'spreadsheetCell'])
          .with_attached_attachments.to_a

        root.show_policy?(current_user) ? blocks : []
      else
        # TODO: permission check
        Docs::Snapshot.find_by!(block_id: root_id, snapshot_version: snapshot_version).blocks.graphql_normalize(root_id)
      end
    end
  end
end
