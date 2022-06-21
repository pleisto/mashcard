# frozen_string_literal: true

module Mutations
  module Blocks
    class HardDelete < ::Mutations::BaseMutation
      graphql_name 'BlockHardDelete'
      argument :ids, [Scalars::UUID], 'block unique id', required: true

      def resolve(ids:)
        Docs::Block.transaction do
          ids.each do |id|
            Docs::Block.unscoped.find(id).hard_delete!
          end
        end
        nil
      rescue => e
        raise Mashcard::GraphQL::Errors::ArgumentError, e.message
      end
    end
  end
end
