# frozen_string_literal: true

module Mutations
  module Blocks
    class Duplicate < ::Mutations::BaseMutation
      graphql_name 'BlockDuplicate'
      argument :id, Scalars::UUID, 'block unique id', required: true

      field :formula_ids, [Scalars::UUID], null: false
      field :id, Scalars::UUID, null: false

      def resolve(id:)
        block = Docs::Block.find(id)
        block.duplicate!
      rescue => e
        raise Mashcard::GraphQL::Errors::ArgumentError, e.message
      end
    end
  end
end
