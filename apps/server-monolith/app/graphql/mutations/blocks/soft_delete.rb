# frozen_string_literal: true

module Mutations
  module Blocks
    class SoftDelete < ::Mutations::BaseMutation
      graphql_name 'BlockSoftDelete'
      argument :hard_delete, Boolean, 'hard delete', required: true
      argument :id, Scalars::UUID, 'block unique id', required: true

      def resolve(id:, hard_delete:)
        block = Docs::Block.find(id)
        authorize! block, to: :edit?
        block.soft_delete!

        block.hard_delete! if hard_delete

        nil
      rescue => e
        raise Mashcard::GraphQL::Errors::ArgumentError, e.message
      end
    end
  end
end
