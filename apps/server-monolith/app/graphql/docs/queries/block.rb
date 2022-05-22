# typed: true
# frozen_string_literal: true

module Docs
  module Queries
    class Block < BrickGraphQL::BaseResolver
      description 'return single block by id.'
      type Docs::Objects::Block, null: true
      authenticate_user!

      argument :id, GraphQL::Types::String, required: true

      def resolve(id:)
        Docs::Block.find(id).tap { |doc| authorize! doc, to: :show? }
      end
    end
  end
end
