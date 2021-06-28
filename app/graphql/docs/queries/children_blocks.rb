# frozen_string_literal: true

module Docs
  class Queries::ChildrenBlocks < BrickGraphQL::BaseResolver
    type [Docs::Objects::Block], null: true

    argument :parent_id, GraphQL::Types::String, required: true,
             description: 'List all children from parent id'
    argument :exclude_pages, GraphQL::Types::Boolean, required: false

    def resolve(parent_id:, exclude_pages:)
      # TODO: permission check
      where = exclude_pages ? "docs_blocks.type != 'page'" : nil
      Docs::Block.find(parent_id, { where: where }).descendants
    end
  end
end
