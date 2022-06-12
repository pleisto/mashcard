# frozen_string_literal: true

module Docs
  module Mutations
    class BlockRename < BrickGraphQL::BaseMutation
      argument :id, BrickGraphQL::Scalars::UUID, 'block id', required: true
      argument :title, String, 'New title', required: true

      def resolve(id:, title:)
        block = Docs::Block.non_deleted.find(id)
        raise 'empty_title' if title.blank?

        block.update!(text: title, meta: block.meta.merge('title' => title))
        nil
      rescue => e
        raise BrickGraphQL::Errors::ArgumentError, e.message
      end
    end
  end
end
