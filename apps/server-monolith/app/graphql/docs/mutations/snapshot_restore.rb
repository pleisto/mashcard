# frozen_string_literal: true

module Docs
  module Mutations
    class SnapshotRestore < BrickGraphQL::BaseMutation
      argument :block_id, BrickGraphQL::Scalars::UUID, 'block id', required: true
      argument :snapshot_version, Integer, 'integer', required: true

      def resolve(block_id:, snapshot_version:)
        Docs::Snapshot.find_by!(block_id: block_id, snapshot_version: snapshot_version).restore!

        nil
      end
    end
  end
end
