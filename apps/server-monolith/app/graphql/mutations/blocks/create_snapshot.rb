# frozen_string_literal: true

module Mutations
  module Blocks
    class CreateSnapshot < ::Mutations::BaseMutation
      graphql_name 'BlockCreateSnapshot'
      argument :id, Scalars::UUID, 'block unique id', required: true

      def resolve(id:)
        block = Docs::Block.non_deleted.find(id)

        block.save_snapshot!

        nil
      end
    end
  end
end
