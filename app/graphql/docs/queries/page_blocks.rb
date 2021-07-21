# frozen_string_literal: true

module Docs
  class Queries::PageBlocks < BrickGraphQL::BaseResolver
    type [Docs::Objects::Block], null: true

    argument :webid, GraphQL::Types::String, required: true,
             description: 'List all pages for pod webid'

    def resolve(webid:)
      authorized_scope Docs::Block.joins(:pod).pageable.where(pod: { webid: webid }), as: :collaborating
    end
  end
end
