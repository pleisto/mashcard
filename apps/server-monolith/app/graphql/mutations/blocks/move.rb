# frozen_string_literal: true

module Mutations
  module Blocks
    class Move < ::Mutations::BaseMutation
      graphql_name 'BlockMove'
      argument :id, Scalars::UUID, 'block unique id', required: true
      argument :sort, GraphQL::Types::BigInt, description_same(Types::Blocks::BaseObject, :sort), required: true
      argument :target_parent_id, Scalars::UUID, 'target parent id', required: false

      def resolve(args)
        block = Docs::Block.non_deleted.find(args[:id])
        authorize! block, to: :edit?
        block.move!(args[:target_parent_id], args[:sort])

        nil
      rescue => e
        { errors: [e.message] }
      end
    end
  end
end
