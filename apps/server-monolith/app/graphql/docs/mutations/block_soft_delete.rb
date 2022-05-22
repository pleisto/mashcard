# typed: true
# frozen_string_literal: true

module Docs
  module Mutations
    class BlockSoftDelete < BrickGraphQL::BaseMutation
      argument :hard_delete, Boolean, 'hard delete', required: true
      argument :id, BrickGraphQL::Scalars::UUID, 'block unique id', required: true

      def resolve(id:, hard_delete:)
        block = Docs::Block.find(id)
        block.soft_delete!

        block.hard_delete! if hard_delete

        nil
      rescue => e
        raise BrickGraphQL::Errors::ArgumentError, e.message
      end
    end
  end
end
