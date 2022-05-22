# typed: true
# frozen_string_literal: true

module Docs
  module Queries
    class BlockShareLinks < BrickGraphQL::BaseResolver
      description 'return share links by block id.'
      type [Docs::Objects::ShareLink], null: false
      authenticate_user!

      argument :id, GraphQL::Types::String, required: true

      def resolve(id:)
        Docs::Block.find(id).share_links.includes(share_space: [:owner, :avatar_attachment]).order(id: :asc)
      end
    end
  end
end
