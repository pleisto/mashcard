# frozen_string_literal: true

module Docs
  class Queries::Blocks < BrickGraphQL::BaseResolver
    type [Docs::Objects::Block], null: true

    argument :webid, GraphQL::Types::String, required: false,
             description: 'List all blocks from webid'
    argument :parent_id, GraphQL::Types::String, required: false,
             description: 'List all children from parent id'
    argument :only_page, GraphQL::Types::Boolean, required: false,
             description: 'return PageBlock only'
    argument :recursion, GraphQL::Types::Boolean, required: false,
             description: 'Recursively find all child blocks'
  end
end
