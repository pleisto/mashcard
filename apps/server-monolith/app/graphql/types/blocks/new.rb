# frozen_string_literal: true

module Types
  module Blocks
    class New < Types::BaseObject
      graphql_name 'BlockNew'
      description 'MashCard Docs::Block New Scheme'

      has_primary_key uuid: true

      field :block_type, String, 'Block Type'
      field :state_id, String, 'Latest State Id', null: true
      field :states, [State], 'Block States', null: true, method: :states_sorted
      field :states_count, Integer, null: true

      field :first_child_sort, GraphQL::Types::BigInt, 'block first child sort', null: false
      field :next_sort, GraphQL::Types::BigInt, 'block next sort', null: false
      field :parent_id, Scalars::UUID, 'parent uuid', null: true
      field :root_id, Scalars::UUID, 'root uuid', null: false
      field :sort, GraphQL::Types::BigInt, 'block sort', null: false

      # field :data, GraphQL::Types::JSON, null: false
      # field :meta, GraphQL::Types::JSON, null: false
      field :deleted_at, GraphQL::Types::ISO8601DateTime, 'deleted_at', null: true

      field :blobs, [Types::Blob], 'blobs', null: true
      field :document_info, DocumentInfo, null: true

      def states_count
        object.states.count
      end

      def document_info
        # TODO: only if is document
        object
      end
    end
  end
end
