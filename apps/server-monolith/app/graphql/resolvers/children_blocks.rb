# frozen_string_literal: true

module Resolvers
  class ChildrenBlocks < BaseResolver
    type [Types::Block], null: true

    argument :root_id, GraphQL::Types::String, required: true,
      description: 'List all children from root id'

    argument :snapshot_version, GraphQL::Types::Int, required: true, description: 'Snapshot version'

    def resolve(root_id:, snapshot_version:)
      return [] if root_id.blank?

      root = Docs::Block.unscoped.find_by(id: root_id)
      raise Mashcard::GraphQL::Errors::ArgumentError, :already_hard_deleted if root&.deleted_permanently_at

      if root.nil?
        params = {
          id: root_id,
          page: true,
          type: 'doc',
          data: {},
          text: '',
          content: [],
          pod_id: current_pod.fetch('id'),
          collaborators: [current_user.id],
        }
        root = Docs::Block.create!(params)
      end

      # TODO: storageType?
      blocks = root.descendants.where.not(type: ['spreadsheetRow', 'spreadsheetCell'])
        .with_attached_attachments.to_a

      root.show_policy?(current_user) ? blocks : []
    end
  end
end
