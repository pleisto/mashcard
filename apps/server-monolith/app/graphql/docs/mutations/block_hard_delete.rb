# typed: false
# frozen_string_literal: true

module Docs
  module Mutations
    class BlockHardDelete < BrickGraphQL::BaseMutation
      argument :ids, [BrickGraphQL::Scalars::UUID], 'block unique id', required: true

      def resolve(ids:)
        Docs::Block.transaction do
          ids.each do |id|
            Docs::Block.unscoped.find(id).hard_delete!
          end
        end
        nil
      rescue => e
        raise BrickGraphQL::Errors::ArgumentError, e.message
      end
    end
  end
end
