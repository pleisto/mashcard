# frozen_string_literal: true

module Docs
  class Queries::BlockHistories < BrickGraphQL::BaseResolver
    description 'return histories by block id.'
    type [Docs::Objects::BlockHistory], null: true
    authenticate_user!

    argument :id, GraphQL::Types::String, required: true

    def resolve(id:)
      Docs::Block.find(id).histories
    end
  end
end
