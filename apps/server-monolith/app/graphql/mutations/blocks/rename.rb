# frozen_string_literal: true

module Mutations
  module Blocks
    class Rename < ::Mutations::BaseMutation
      graphql_name 'BlockRename'
      argument :id, Scalars::UUID, 'block id', required: true
      argument :title, String, 'New title', required: true

      def resolve(id:, title:)
        block = Docs::Block.non_deleted.find(id)
        raise 'empty_title' if title.blank?

        block.update!(text: title, meta: block.meta.merge('title' => title))
        nil
      rescue => e
        raise Mashcard::GraphQL::Errors::ArgumentError, e.message
      end
    end
  end
end
