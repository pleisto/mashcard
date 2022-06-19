# frozen_string_literal: true

module Resolvers
  class Block < Resolvers::BaseResolver
    description 'return single block by id.'
    type Types::Block, null: true
    authenticate_user!

    argument :id, GraphQL::Types::String, required: true

    def resolve(id:)
      Docs::Block.find(id).tap { |doc| authorize! doc, to: :show? }
    end
  end
end
