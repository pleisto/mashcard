# frozen_string_literal: true

module Resolvers
  class BlockShareLinks < BaseResolver
    description 'return share links by block id.'
    type [Types::ShareLink], null: false
    authenticate_user!

    argument :id, GraphQL::Types::String, required: true

    def resolve(id:)
      Docs::Block.find(id).share_links.includes(share_pod: [:owner, :avatar_attachment]).order(id: :asc)
    end
  end
end
