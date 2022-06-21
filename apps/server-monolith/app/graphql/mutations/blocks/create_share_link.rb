# frozen_string_literal: true

module Mutations
  module Blocks
    class CreateShareLink < ::Mutations::BaseMutation
      graphql_name 'BlockCreateShareLink'
      argument :id, Scalars::UUID, 'block id', required: true
      argument :target, [Types::ShareLinkInput], 'share link target', required: true

      def resolve(id:, target:)
        block = Docs::Block.non_deleted.find(id)
        block.upsert_share_links!(target)

        nil
      rescue => e
        raise Mashcard::GraphQL::Errors::ArgumentError, e.message
      end
    end
  end
end
