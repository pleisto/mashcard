# frozen_string_literal: true

module Mutations
  module Blocks
    class HardDelete < ::Mutations::BaseMutation
      graphql_name 'BlockHardDelete'
      argument :ids, [Scalars::UUID], 'block unique id', required: true

      def resolve(ids:)
        Docs::Block.transaction do
          Docs::Block.unscoped.where(id: ids).find_each do |block|
            if allowed_to?(:edit?, block)
              block.hard_delete!
            end
          end
        end
        nil
      rescue => e
        raise Mashcard::GraphQL::Errors::ArgumentError, e.message
      end
    end
  end
end
