# typed: true
# frozen_string_literal: true

module Docs
  module Mutations
    class BlockDuplicate < BrickGraphQL::BaseMutation
      argument :id, BrickGraphQL::Scalars::UUID, 'block unique id', required: true

      field :formula_ids, [BrickGraphQL::Scalars::UUID], null: false
      field :id, BrickGraphQL::Scalars::UUID, null: false

      def resolve(id:)
        block = Docs::Block.find(id)
        block.duplicate!
      rescue => e
        raise BrickGraphQL::Errors::ArgumentError, e.message
      end
    end
  end
end
